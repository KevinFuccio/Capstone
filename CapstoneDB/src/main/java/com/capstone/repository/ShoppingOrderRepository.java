package com.capstone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.ShoppingOrder;

public interface ShoppingOrderRepository extends JpaRepository<ShoppingOrder, Long> {
    List<ShoppingOrder> findDistinctByUserId(Long userId);
}

