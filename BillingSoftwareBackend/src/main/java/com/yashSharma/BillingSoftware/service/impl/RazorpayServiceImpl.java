package com.yashSharma.BillingSoftware.service.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.yashSharma.BillingSoftware.io.OrderResponse;
import com.yashSharma.BillingSoftware.io.PaymentVerificationRequest;
import com.yashSharma.BillingSoftware.io.RazorpayOrderResponse;
import com.yashSharma.BillingSoftware.repository.RazoryPayRepository;
import com.yashSharma.BillingSoftware.service.RozarpayService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

@Service
public class RazorpayServiceImpl implements RozarpayService {

    @Autowired
    public RazoryPayRepository razoryPayRepository;

    @Autowired
    public  OrderServiceImpl orderService;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) {

        RazorpayOrderResponse order= convertToResponse(amount, currency);
        razoryPayRepository.save(order);
        return order;
    }

    private RazorpayOrderResponse convertToResponse(Double amount, String currency) {
        return RazorpayOrderResponse.builder()
                .id(UUID.randomUUID().toString())
                .entity("order")
                .amount((int) (amount*100))
                .currency(currency)
                .status("created")
                .created_at(new Date())
                .receipt(String.valueOf(System.currentTimeMillis()))
                .build();
    }

}