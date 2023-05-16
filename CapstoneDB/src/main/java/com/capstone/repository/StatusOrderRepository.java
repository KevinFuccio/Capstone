package com.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.StatusOrder;
import com.capstone.enums.Status_Order;

public interface StatusOrderRepository extends JpaRepository<StatusOrder, Long>{
	Optional<StatusOrder> findByName(Status_Order name);
}
