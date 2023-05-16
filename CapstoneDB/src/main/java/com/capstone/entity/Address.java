package com.capstone.entity;

import java.util.ArrayList;
import java.util.List;

import com.capstone.auth.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String city;
	private String streetName;
	private String postalCode;
	private String region;
	@JsonIgnoreProperties(value = "address")
	@ManyToMany(mappedBy = "address")
	private List<User> users = new ArrayList<>();
	
}
