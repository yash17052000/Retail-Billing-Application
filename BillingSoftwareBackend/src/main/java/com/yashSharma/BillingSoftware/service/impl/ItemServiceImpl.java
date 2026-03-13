package com.yashSharma.BillingSoftware.service.impl;

import com.yashSharma.BillingSoftware.Entity.CategoryEntity;
import com.yashSharma.BillingSoftware.Entity.ItemEntity;
import com.yashSharma.BillingSoftware.io.ItemRequest;
import com.yashSharma.BillingSoftware.io.ItemResponse;
import com.yashSharma.BillingSoftware.repository.CategoryRepository;
import com.yashSharma.BillingSoftware.repository.ItemRepository;
import com.yashSharma.BillingSoftware.service.FileUploadService;
import com.yashSharma.BillingSoftware.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private  FileUploadServiceImpl fileUploadService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ItemRepository itemRepository;


    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString()+ "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
        Path uploadPath = Paths.get("UploadsFile").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path targetLocation = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        String imgUrl = "http://localhost:8080/api/v1/UploadsFile/" + fileName;
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));

        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }
    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }
    @Override
    public List<ItemResponse> fetchItems(Optional<String> name) {
        return itemRepository.findByName((name).orElse(null))
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());        // Collect back to List
    }

    @Override
    public void deleteItem(String itemId) {

        Optional<ItemEntity>itemEntity= itemRepository.findByItemId(itemId) ;
        String imageUrl = itemEntity.get().getImgUrl();
        String imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        Path uploadsFile = Paths.get("UploadsFile").toAbsolutePath().normalize();

        try {
            Files.delete(Path.of(uploadsFile.toString()+"/" + imageName));
            System.out.println("File deleted successfully.");
        } catch (NoSuchFileException e) {
            System.out.println("File does not exist.");
        } catch (IOException e) {
            e.printStackTrace();
        }


        itemRepository.delete(itemId);

    }
}
