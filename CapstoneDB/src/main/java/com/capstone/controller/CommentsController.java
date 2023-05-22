package com.capstone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.entity.Comments;
import com.capstone.entity.Product;
import com.capstone.payload.CommentsDto;
import com.capstone.repository.CommentsRepository;
import com.capstone.repository.ProductRepository;
import com.capstone.service.CommentsService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/comments")
public class CommentsController {
	@Autowired
	CommentsService commentsService;
	@Autowired
	CommentsRepository commentsRepo;
	@Autowired
	ProductRepository productRepo;
	
	@PostMapping("/")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Comments> postNewComment(@RequestBody CommentsDto comments){
		return new ResponseEntity<Comments>(commentsService.createComment(comments),HttpStatus.OK);
	}

}
