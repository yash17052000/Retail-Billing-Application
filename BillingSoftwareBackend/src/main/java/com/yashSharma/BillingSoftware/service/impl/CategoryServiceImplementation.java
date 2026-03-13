package com.yashSharma.BillingSoftware.service.impl;

import com.yashSharma.BillingSoftware.Entity.CategoryEntity;
import com.yashSharma.BillingSoftware.io.CategoryRequest;
import com.yashSharma.BillingSoftware.io.CategoryResponse;
import com.yashSharma.BillingSoftware.repository.CategoryRepository;
import com.yashSharma.BillingSoftware.repository.ItemRepository;
import com.yashSharma.BillingSoftware.service.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImplementation implements CategoryService {


    @Autowired
    private   CategoryRepository categoryRepository;
    @Autowired
    private  FileUploadServiceImpl fileUploadService;

    @Autowired
    private ItemRepository itemRepository;
    @Override
    public CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file) throws IOException {
//        String imgUrl=fileUploadService.storeFile(file);

        String fileName = UUID.randomUUID().toString()+ "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
        Path uploadPath = Paths.get("UploadsFile").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path targetLocation = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        String imgUrl = "http://localhost:8080/api/v1/UploadsFile/" + fileName;
        CategoryEntity newCategory= convertToEntity(categoryRequest);
        newCategory.setImgUrl(imgUrl);

    newCategory=categoryRepository.save(newCategory);
    return convertToResponse(newCategory);
    }



    @Override
    public List<CategoryResponse> read(Optional<String> name) {
        return categoryRepository.getAllCategories(name.orElse(null))
                .stream()
                .map(category->convertToResponse(category))
                .collect(Collectors.toList());
    }


    @Override
    public void delete(String categoryId) {
        Optional<CategoryEntity> categoryEntity = categoryRepository.findByCategoryId(categoryId);
        String imageUrl = categoryEntity.get().getImgUrl();
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


        categoryRepository.delete(categoryId);



    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .id(newCategory.getId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemRepository.countByCategoryId(newCategory.getId()))
                .build();

    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
      return  CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();

    }
}
