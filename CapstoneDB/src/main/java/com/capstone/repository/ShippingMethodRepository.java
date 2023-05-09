package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.ShippingMethod;

public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Long> {

}
