package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{

}
