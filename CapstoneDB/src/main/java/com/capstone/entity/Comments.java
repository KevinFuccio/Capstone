package com.capstone.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.capstone.auth.entity.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Comments {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private User user;
	@ManyToOne
	private Product product;
	private String comment;
	private LocalDate published = LocalDate.now();
	private int valutation;

}
