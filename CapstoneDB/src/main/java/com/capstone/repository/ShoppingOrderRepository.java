package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.ShoppingOrder;

public interface ShoppingOrderRepository extends JpaRepository<ShoppingOrder,Long>{

}
