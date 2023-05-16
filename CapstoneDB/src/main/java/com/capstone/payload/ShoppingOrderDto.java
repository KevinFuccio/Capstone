package com.capstone.payload;

import java.util.List;

import com.capstone.entity.Address;
import com.capstone.entity.OrderLine;
import com.capstone.entity.PaymentMethod;
import com.capstone.enums.Shipping_method;

import lombok.Data;

@Data
public class ShoppingOrderDto {
	private Address address;
	private List<OrderLine> orderLine;
	private double totalPrice;
	private Shipping_method shippingMethod;
	private List<PaymentMethod> paymentMethod;
	
}
