package com.capstone.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;
import com.capstone.entity.Address;
import com.capstone.entity.ShippingMethod;
import com.capstone.entity.ShoppingOrder;
import com.capstone.entity.StatusOrder;
import com.capstone.enums.Status_Order;
import com.capstone.payload.AddressDto;
import com.capstone.payload.ShoppingOrderDto;
import com.capstone.repository.AddressRepository;
import com.capstone.repository.ShippingMethodRepository;
import com.capstone.repository.ShoppingOrderRepository;
import com.capstone.repository.StatusOrderRepository;

@Service
public class ShoppingOrderService {
	@Autowired
	ShoppingOrderRepository  shoppingOrderRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	ShippingMethodRepository shippingRepo;
	@Autowired
	AddressService addressService;
	@Autowired
	AddressRepository addressRepo;
	@Autowired
	StatusOrderRepository statusRepo;
	
	public ShoppingOrder createOrder(ShoppingOrderDto ShoppingOrder,Long user_id) {
		
		AddressDto addDto = new AddressDto();
		addDto.setStreetName(ShoppingOrder.getAddress().getStreetName());
		addDto.setStreetNumber(ShoppingOrder.getAddress().getStreetNumber());
		addDto.setRegion(ShoppingOrder.getAddress().getRegion());
		addDto.setPostalCode(ShoppingOrder.getAddress().getPostalCode());
		addDto.setCity(ShoppingOrder.getAddress().getCity());
		
		
		User u = userRepo.findById(user_id).get();
		Address address = addressService.createAndConnectAddress(addDto, u.getId());
		
		ShoppingOrder s = new ShoppingOrder();
		ShoppingOrder.getOrderLine().forEach(e->e.setShoppingOrder_id(s));
		s.setUser(u);
		s.setInitializedOrder(LocalDate.now());
		s.setOrderLine(ShoppingOrder.getOrderLine());
		//da passare via front-end per semplicità
		s.setAddress(address);
		s.setStatus(statusRepo.findByName(Status_Order.INITIALIZED).get());
		s.setShippingMethod(shippingRepo.findByName(ShoppingOrder.getShippingMethod()).get());
		
		switch(s.getShippingMethod().getName()) {
		case STANDARD:
			s.setScheduledDelivery(LocalDate.now().plusDays(5));
			break;
		case EXPRESS:
			s.setScheduledDelivery(LocalDate.now().plusDays(3));
			break;
		case ONE_DAY:
			s.setScheduledDelivery(LocalDate.now().plusDays(1));
			break;
		default:
			break;
		}
		ShoppingOrder.getOrderLine().forEach(e->s.setTotalPrice(e.getPrice()));
		shoppingOrderRepo.save(s);
		
		
		
		return s;
	}
}
