package com.capstone.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id){
		return new ResponseEntity<User>(userRepo.findById(id).get(),HttpStatus.OK);
	}
}
