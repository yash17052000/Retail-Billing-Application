package com.yashSharma.BillingSoftware.repository;

import com.yashSharma.BillingSoftware.Entity.ItemEntity;
import com.yashSharma.BillingSoftware.Entity.UserEntity;
import com.yashSharma.BillingSoftware.io.ItemResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import  java.util.*;
@Repository
public interface ItemRepository extends JpaRepository<ItemEntity,String> {
 Optional<ItemEntity> findByItemId(String itemId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tbl_items WHERE item_id = :itemId", nativeQuery = true)
    void delete(@Param("itemId") String itemId);
 Integer countByCategoryId(Long id);
    @Query(value = "SELECT * FROM tbl_items as c WHERE c.name LIKE %:name% OR :name is null",nativeQuery = true)
    List<ItemEntity> findByName(@Param("name") String name);
}
