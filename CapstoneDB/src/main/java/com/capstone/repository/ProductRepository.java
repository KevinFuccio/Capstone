package com.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.Product;
import com.capstone.enums.Category_Name;

public interface ProductRepository extends JpaRepository<Product, Long>{
	List<Product> findByProductCategory_Name(Category_Name categoryName);
	List<Product> findByNameContainingIgnoreCase(String name);
}
