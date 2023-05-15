package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;
import com.capstone.entity.Address;
import com.capstone.payload.AddressDto;
import com.capstone.repository.AddressRepository;

import it.epicode.bw.auth.exception.MyAPIException;

@Service
public class AddressService {
	@Autowired
	AddressRepository addressRepo;
	@Autowired
	UserRepository userRepo;

	public Address createAndConnectAddress(AddressDto address, Long userId) {
		User u = userRepo.findById(userId).get();
		Address a = addressRepo.findByCityAndStreetNameAndStreetNumberAndPostalCodeAndRegion(address.getCity(),
				address.getStreetName(), address.getStreetNumber(), address.getPostalCode(), address.getRegion())
				.orElse(null);

		if (a == null) {
			a = new Address();
			a.setCity(address.getCity());
			a.setStreetName(address.getStreetName());
			a.setStreetNumber(address.getStreetNumber());
			a.setPostalCode(address.getPostalCode());
			a.setRegion(address.getRegion());
			addressRepo.save(a);
		}
		if(!u.getAddress().contains(a)) {			
			u.getAddress().add(a);
			a.getUsers().add(u);
			userRepo.save(u);
		}
		return a;
	}
}
