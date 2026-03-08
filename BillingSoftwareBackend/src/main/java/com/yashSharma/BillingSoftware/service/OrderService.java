package com.yashSharma.BillingSoftware.service;

import com.yashSharma.BillingSoftware.io.OrderRequest;
import com.yashSharma.BillingSoftware.io.OrderResponse;
import com.yashSharma.BillingSoftware.io.PaymentVerificationRequest;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);
}