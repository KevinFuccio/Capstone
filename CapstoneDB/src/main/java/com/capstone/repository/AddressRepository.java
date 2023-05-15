package com.capstone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.Address;


public interface AddressRepository extends JpaRepository<Address, Long>{
	Optional<Address> findByCityAndStreetNameAndStreetNumberAndPostalCodeAndRegion(String City,String StreetName,String StreetNumber,String PostalCode,String Region);
}
