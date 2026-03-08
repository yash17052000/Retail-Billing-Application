package com.yashSharma.BillingSoftware.io;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private Long id;
    private String categoryId;
    private String name;
    private String description;
    private String bgColor;
    private String imgUrl;
    private  Integer items;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
