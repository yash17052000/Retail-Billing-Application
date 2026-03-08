package com.yashSharma.BillingSoftware.Controller;


import com.yashSharma.BillingSoftware.Entity.CategoryEntity;
import com.yashSharma.BillingSoftware.io.CategoryRequest;
import com.yashSharma.BillingSoftware.io.CategoryResponse;
import com.yashSharma.BillingSoftware.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request = null;
        try {
            request = objectMapper.readValue(categoryString, CategoryRequest.class);
            return categoryService.add(request, file);
        } catch (JsonParseException jsonParseException) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occurred while parsing the JSON");
        }
    }
    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories(@RequestParam Optional<String> name) {
        return categoryService.read(name);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("admin/categories/{categoryId}")
    public void remove(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found: " + categoryId);
        }
    }


}
