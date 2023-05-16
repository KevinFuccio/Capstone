package com.capstone.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class PaymentMethod {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String provider;
	private LocalDate create_time;
	private String status;
	@JsonIgnoreProperties(value = "paymentMethod")
	@ManyToOne
	private ShoppingOrder shoppingOrder;
	
	
}
