package com.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.payload.ShoppingOrderDto;
import com.capstone.repository.ShoppingOrderRepository;
import com.capstone.service.ShoppingOrderService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class ShoppingOrderController {
	@Autowired
	ShoppingOrderService shoppingOrderService;
	@Autowired
	ShoppingOrderRepository shoppingRepo;

	
	@PostMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> createNewShoppingOrder(@RequestBody ShoppingOrderDto ShoppingOrderDto,@PathVariable Long id){
		
		return new ResponseEntity<>(shoppingOrderService.createOrder(ShoppingOrderDto,id),HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserOrders(@PathVariable Long id){
		
		return new ResponseEntity<>(shoppingRepo.findDistinctByUserId(id),HttpStatus.OK);
	}
	
}
