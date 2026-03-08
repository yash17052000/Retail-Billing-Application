package com.yashSharma.BillingSoftware.repository;

import com.yashSharma.BillingSoftware.io.RazorpayOrderResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  RazoryPayRepository extends JpaRepository<RazorpayOrderResponse,String> {
}
