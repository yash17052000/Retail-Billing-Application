package com.yashSharma.BillingSoftware.service;

import com.razorpay.RazorpayException;
import com.yashSharma.BillingSoftware.io.RazorpayOrderResponse;

public interface RozarpayService {
   RazorpayOrderResponse createOrder(Double amount, String currency) ;
}
