package com.yashSharma.BillingSoftware.repository;

import com.yashSharma.BillingSoftware.Entity.UserEntity;
import com.yashSharma.BillingSoftware.io.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
   Optional<UserEntity> findByUserId(String id);
    Optional<UserEntity> findByEmail(String email);
    @Query(value = "SELECT * FROM tbl_users as c WHERE c.name LIKE %:name% OR :name is null",nativeQuery = true)
    List<UserEntity> getUsers(@Param("name") String name);
}
