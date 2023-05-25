package com.capstone.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;
import com.capstone.entity.Address;
import com.capstone.entity.OrderLine;
import com.capstone.entity.PaymentMethod;
import com.capstone.entity.ShippingMethod;
import com.capstone.entity.ShoppingOrder;
import com.capstone.entity.StatusOrder;
import com.capstone.enums.Status_Order;
import com.capstone.payload.AddressDto;
import com.capstone.payload.ShoppingOrderDto;
import com.capstone.repository.AddressRepository;
import com.capstone.repository.PaymentMethodRepository;
import com.capstone.repository.ShippingMethodRepository;
import com.capstone.repository.ShoppingOrderRepository;
import com.capstone.repository.StatusOrderRepository;

import jakarta.transaction.Transactional;

@Service
public class ShoppingOrderService {
	@Autowired
	ShoppingOrderRepository shoppingOrderRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	ShippingMethodRepository shippingRepo;
	@Autowired
	AddressService addressService;
	@Autowired
	PaymentService payService;
	@Autowired
	AddressRepository addressRepo;
	@Autowired
	StatusOrderRepository statusRepo;
	@Autowired
	PaymentMethodRepository payRepo;

	public ShoppingOrder createOrder(ShoppingOrderDto ShoppingOrder, Long user_id) {
		ShoppingOrder s = new ShoppingOrder();
		

		AddressDto addDto = new AddressDto();
		addDto.setStreetName(ShoppingOrder.getAddress().getStreetName());
		addDto.setRegion(ShoppingOrder.getAddress().getRegion());
		addDto.setPostalCode(ShoppingOrder.getAddress().getPostalCode());
		addDto.setCity(ShoppingOrder.getAddress().getCity());

		User u = userRepo.findById(user_id).get();
		Address address = addressService.createAndConnectAddress(addDto, u.getId());
		s.setUser(u);
		s.setInitializedOrder(LocalDate.now());
		
		Set<OrderLine> uniqueOrderLines = new HashSet<>(ShoppingOrder.getOrderLine());
		List<OrderLine> orderLine = new ArrayList<>(uniqueOrderLines);
		s.setOrderLine(orderLine);

		s.getOrderLine().forEach(e -> e.setShoppingOrder(s));
		s.setAddress(address);
		s.setStatus(statusRepo.findByName(Status_Order.INITIALIZED).get());
		s.setShippingMethod(shippingRepo.findByName(ShoppingOrder.getShippingMethod()).get());

		switch (s.getShippingMethod().getName()) {
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
		
		
		double totPrice = 0;

		for (OrderLine e : ShoppingOrder.getOrderLine()) {
		    totPrice += e.getPrice();
		}

		double roundedPrice = Math.round(totPrice * 100.0) / 100.0;
		s.setTotalPrice(roundedPrice);


		shoppingOrderRepo.save(s);
		List<PaymentMethod> pay = new ArrayList<>();
		ShoppingOrder.getPaymentMethod().forEach(e -> {
			PaymentMethod p = payService.createNewPayment(e.getProvider(), e.getStatus(),s);
			pay.add(p);
		});
		s.setPaymentMethod(pay);
		s.getPaymentMethod().forEach(e-> e.setShoppingOrder(s));

		return s;
	}

}
