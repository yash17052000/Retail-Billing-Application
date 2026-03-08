package com.yashSharma.BillingSoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;
import java.math.BigDecimal;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemResponse {
    private String itemId;
    private String name;
    private BigDecimal price;
    private String description;
    private  String categoryId;
    private  String categoryName;
    private  String imgUrl;
    private  Timestamp createdAt;
    private  Timestamp updatedAt;
}
