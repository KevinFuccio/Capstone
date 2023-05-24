package com.capstone.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.auth.entity.User;
import com.capstone.auth.payload.JWTAuthResponse;
import com.capstone.auth.payload.LoginDto;
import com.capstone.auth.payload.RegisterDto;
import com.capstone.auth.repository.UserRepository;
import com.capstone.auth.service.AuthService;



@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;
    @Autowired
    private UserRepository userRepo;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Build Login REST API
    @PostMapping(value = {"/login", "/signin"})
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginDto loginDto){
           	
    	String token = authService.login(loginDto);
    	User u = userRepo.findByUsername(loginDto.getUsername()).get();

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setId(u.getId());
        jwtAuthResponse.setUsername(loginDto.getUsername());
        jwtAuthResponse.setAccessToken(token);
        u.getRoles().forEach(e-> jwtAuthResponse.getRoles().add(e));
        u.getAddress().forEach(e-> jwtAuthResponse.getAddress().add(e));
        jwtAuthResponse.setEmail(u.getEmail());
        jwtAuthResponse.setPassword(u.getPassword());
        
        

        return ResponseEntity.ok(jwtAuthResponse);
    }

    // Build Register REST API
    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
