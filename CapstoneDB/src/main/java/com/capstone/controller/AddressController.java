package com.capstone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.entity.Address;
import com.capstone.payload.AddressDto;
import com.capstone.service.AddressService;
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/address")
public class AddressController {
	@Autowired
	AddressService addressService;
	
	@PostMapping(value="/add/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Address> addAddressToUser(@RequestBody AddressDto address,@PathVariable Long id){
		return new ResponseEntity<Address>(addressService.createAndConnectAddress(address, id),HttpStatus.OK);
	}
}
