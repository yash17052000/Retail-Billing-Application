package com.yashSharma.BillingSoftware.repository;

import com.yashSharma.BillingSoftware.Entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {


    Optional<CategoryEntity> findByCategoryId(String categoryId);

    @Query(value = "SELECT * FROM tbl_category c WHERE (:name IS NULL OR c.name LIKE CONCAT('%', :name, '%'))",
            nativeQuery = true)
    List<CategoryEntity> getAllCategories(@Param("name") String name);
}
