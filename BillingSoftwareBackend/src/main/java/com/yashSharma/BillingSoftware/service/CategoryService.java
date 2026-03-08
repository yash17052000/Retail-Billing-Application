package com.yashSharma.BillingSoftware.service;

import com.yashSharma.BillingSoftware.Entity.CategoryEntity;
import com.yashSharma.BillingSoftware.io.CategoryRequest;
import com.yashSharma.BillingSoftware.io.CategoryResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


public interface CategoryService {

   CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file);
   List<CategoryResponse> read(Optional<String> name);

    void delete(String categoryId);

}
