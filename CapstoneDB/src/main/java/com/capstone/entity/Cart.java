package com.capstone.entity;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
@Data
public class Cart {
	private List<Product> productsItems = new ArrayList<Product>();
	private int cartTotalQuantity;
	private int cartTotalAmount;

}
