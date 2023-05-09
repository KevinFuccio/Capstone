package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.Address;


public interface AddressRepository extends JpaRepository<Address, Long>{

}
