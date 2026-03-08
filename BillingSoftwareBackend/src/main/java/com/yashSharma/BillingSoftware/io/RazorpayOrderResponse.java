package com.yashSharma.BillingSoftware.io;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "tbl_razorpay")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RazorpayOrderResponse {
    @Id

    private String id;
    private String entity;
    private Integer amount;
    private String currency;
    private String status;
    private Date created_at;
    @Column(unique = true)
    private String receipt;
}