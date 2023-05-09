package com.capstone.entity;

import java.time.LocalDate;
import java.util.List;

import com.capstone.auth.entity.User;
import com.capstone.enums.Shipping_method;
import com.capstone.enums.Status_Order;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@OneToMany
	private List<Product> products;
	private double totalPrice;
	@ManyToOne
	private StatusOrder status;
	@ManyToOne
	private ShippingMethod shippingMethod;
}
