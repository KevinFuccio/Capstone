package com.capstone.auth.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
@Entity
@Data
public class ShoppingOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private User user;
	private LocalDate initializedOrder;
	private LocalDate scheduledDelivery;
	@ManyToOne
	private Address address;
	private double totalPrice;
	private Status_Order status;
	private Shipping_method shippingMethod;
}
