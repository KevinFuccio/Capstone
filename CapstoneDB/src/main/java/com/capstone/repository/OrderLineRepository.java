package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.OrderLine;

public interface OrderLineRepository extends JpaRepository<OrderLine, Long>{

}
