package com.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.capstone.entity.ShippingMethod;
import com.capstone.enums.Shipping_method;

public interface ShippingMethodRepository extends JpaRepository<ShippingMethod, Long> {
	Optional<ShippingMethod> findByName(Shipping_method shippingMethod);
}
