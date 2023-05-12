package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;
import com.capstone.entity.Address;
import com.capstone.payload.AddressDto;
import com.capstone.repository.AddressRepository;

@Service
public class AddressService {
	@Autowired
	AddressRepository addressRepo;
	@Autowired
	UserRepository userRepo;
	
	public String createAndConnectAddress(AddressDto address,Long userId) {
		User u = userRepo.findById(userId).get();
		Address a = new Address();
		a.setCity(address.getCity());
		a.setStreetName(address.getStreetName());
		a.setStreetNumber(address.getStreetNumber());
		a.setPostalCode(address.getPostalCode());
		a.setRegion(address.getRegion());
		u.getAddress().add(a);
		userRepo.save(u);
		return "address added successfully";
	}
}
