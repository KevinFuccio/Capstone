package com.capstone.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String description;
	private String image;
	private Long quantityInStock;
	private Double price;
	@ManyToOne
	private ProductCategory productCategory;
	@ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.MERGE)
	private Set<ProductVariant> productVariant = new HashSet<>();
	@JsonIgnoreProperties(value = "product")
	@OneToMany(mappedBy = "product")
	private List<Comments> comments= new ArrayList<>();
	
	
}
