package com.capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.entity.Comments;

public interface CommentsRepository extends JpaRepository<Comments,Long>{

}
