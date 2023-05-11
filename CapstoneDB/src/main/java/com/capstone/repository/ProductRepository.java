package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
