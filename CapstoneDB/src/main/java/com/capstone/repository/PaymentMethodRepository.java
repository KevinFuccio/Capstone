package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.PaymentMethod;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod,Long>{

}
