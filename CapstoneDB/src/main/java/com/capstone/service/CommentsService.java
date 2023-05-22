package com.capstone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;
import com.capstone.entity.Comments;
import com.capstone.entity.Product;
import com.capstone.payload.CommentsDto;
import com.capstone.repository.CommentsRepository;
import com.capstone.repository.ProductRepository;

@Service
public class CommentsService {
	@Autowired
	UserRepository userRepo;
	@Autowired
	ProductRepository productRepo;
	@Autowired
	CommentsRepository commentsRepo;

	public Comments createComment(CommentsDto comments) {
		User u = userRepo.findById(comments.getUser_id()).get();
		Product p = productRepo.findById(comments.getProduct_id()).get();
		
		Comments c = new Comments();
		c.setUser(u);
		c.setProduct(p);
		c.setComment(comments.getComment());
		c.setValutation(comments.getValutation());
		commentsRepo.save(c);
		return c;
		
	}
	
}
