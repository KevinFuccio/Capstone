package com.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.Address;


public interface AddressRepository extends JpaRepository<Address, Long>{
	Optional<Address> findByCityAndStreetNameAndAndPostalCodeAndRegion(String City,String StreetName,String PostalCode,String Region);
}
