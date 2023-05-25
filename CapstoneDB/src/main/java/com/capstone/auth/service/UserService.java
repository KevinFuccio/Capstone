package com.capstone.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.User;
import com.capstone.auth.payload.UserModifyDto;
import com.capstone.auth.repository.UserRepository;

import it.epicode.bw.auth.exception.MyAPIException;

@Service
public class UserService {
	@Autowired
	UserRepository userRepo;
	public User userModify(Long id,UserModifyDto u) {
					
			if(u.getEmail() !=null && u.getUsername() != null) {			
				User user = userRepo.findById(id).get();
				user.setUsername(u.getUsername());
				user.setEmail(u.getEmail());
				userRepo.save(user);
				return user;
			}else {
				throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email o nome mancante");
			}
		
	}

}
