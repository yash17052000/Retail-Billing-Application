package com.yashSharma.BillingSoftware.Controller;

import com.yashSharma.BillingSoftware.io.ItemRequest;
import com.yashSharma.BillingSoftware.io.ItemResponse;
import com.yashSharma.BillingSoftware.service.ItemService;
import com.yashSharma.BillingSoftware.service.impl.ItemServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;

@RestController
public class ItemController {

    @Autowired
    private ItemServiceImpl itemService;
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/admin/items")
    public ItemResponse addItem(
            @RequestPart("item") String itemString,
            @RequestPart("file") MultipartFile file) {

        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest itemRequest = null;

        try {
            // Convert the JSON string (itemString) into an ItemRequest object
            itemRequest = objectMapper.readValue(itemString, ItemRequest.class);

            // Call service layer to add the item
            return itemService.add(itemRequest, file);
        } catch (Exception ex) {
            // Handle invalid JSON format
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while processing item data");
        }
    }
    @GetMapping("/items")
    public List<ItemResponse> readItems(@RequestParam Optional<String> name) {
        return itemService.fetchItems(name);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/admin/items/{itemId}")
    public void removeItem(@PathVariable String itemId) {
        itemService.deleteItem(itemId);
    }
}
