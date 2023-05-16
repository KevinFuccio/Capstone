package com.capstone.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.entity.PaymentMethod;
import com.capstone.entity.ShoppingOrder;
import com.capstone.repository.PaymentMethodRepository;

@Service
public class PaymentService {
	@Autowired
	PaymentMethodRepository payRepo;
	
	public PaymentMethod createNewPayment(String a1,String a2,ShoppingOrder s) {
		PaymentMethod p = new PaymentMethod();
		p.setCreate_time(LocalDate.now());
		p.setProvider(a1);
		p.setStatus(a2);
		p.setShoppingOrder(s);
		payRepo.save(p);
		return p;
	}

}
