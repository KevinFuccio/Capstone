package com.capstone.auth.controller;

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

import com.capstone.auth.entity.User;
import com.capstone.auth.payload.UserModifyDto;
import com.capstone.auth.repository.UserRepository;
import com.capstone.auth.service.UserService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserRepository userRepo;
	@Autowired
	UserService userService;
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id){
		return new ResponseEntity<User>(userRepo.findById(id).get(),HttpStatus.OK);
	}
	@PostMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<User> modifyUser(@PathVariable Long id,@RequestBody UserModifyDto u){
								
		return new ResponseEntity<User>(userService.userModify(id, u),HttpStatus.OK);
	}
}
