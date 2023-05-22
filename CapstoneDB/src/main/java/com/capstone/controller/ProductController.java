package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.entity.Product;
import com.capstone.enums.Category_Name;
import com.capstone.repository.ProductRepository;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
	@Autowired
	ProductRepository productRepo;
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> productList(){
		return new ResponseEntity<List<Product>>(productRepo.findAll(),HttpStatus.OK);
	}
	@GetMapping("/category/{name}")
	public ResponseEntity<List<Product>> productByType(@PathVariable Category_Name name){
		return new ResponseEntity<List<Product>>(productRepo.findByProductCategory_Name(name),HttpStatus.OK);
	}
	@GetMapping("/name/{name}")
	public ResponseEntity<List<Product>> productByName(@PathVariable String name){
		return new ResponseEntity<List<Product>>(productRepo.findByNameContainingIgnoreCase(name),HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Product> singleProduct(@PathVariable Long id){
		return new ResponseEntity<Product>(productRepo.findById(id).get(),HttpStatus.OK);
	}
}
