package com.capstone.entity;

import java.time.LocalDate;
import java.util.List;

import com.capstone.auth.entity.User;
import com.capstone.enums.Shipping_method;
import com.capstone.enums.Status_Order;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
	@JsonIgnoreProperties
	private Address address;
	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@JsonIgnoreProperties(value = "shoppingOrder")
	private List<OrderLine> orderLine;
	private double totalPrice;
	@ManyToOne
	private StatusOrder status;
	@ManyToOne
	private ShippingMethod shippingMethod;
	@JsonIgnoreProperties(value = "shoppingOrder")
	@OneToMany(mappedBy = "shoppingOrder")
	private List<PaymentMethod> paymentMethod;
}
