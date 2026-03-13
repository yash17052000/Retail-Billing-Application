package com.yashSharma.BillingSoftware.service;

import com.yashSharma.BillingSoftware.io.ItemRequest;
import com.yashSharma.BillingSoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file) throws IOException;
    List<ItemResponse> fetchItems(Optional<String> name);
    void deleteItem(String itemId);
}