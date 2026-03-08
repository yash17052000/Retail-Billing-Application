package com.yashSharma.BillingSoftware.Controller;

import com.razorpay.RazorpayException;
import com.yashSharma.BillingSoftware.io.OrderResponse;
import com.yashSharma.BillingSoftware.io.PaymentRequest;
import com.yashSharma.BillingSoftware.io.PaymentVerificationRequest;
import com.yashSharma.BillingSoftware.io.RazorpayOrderResponse;
import com.yashSharma.BillingSoftware.service.OrderService;
import com.yashSharma.BillingSoftware.service.impl.RazorpayServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    @Autowired
    private  RazorpayServiceImpl razorpayService;
    @Autowired
    private  OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request)
            throws RazorpayException {

        return razorpayService.createOrder(
                request.getAmount(),
                request.getCurrency()
        );
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }
}