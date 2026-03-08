package com.yashSharma.BillingSoftware.io;

import jakarta.persistence.*;
import lombok.*;
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDetails {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private  PaymentStatus status;

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED
    }
}