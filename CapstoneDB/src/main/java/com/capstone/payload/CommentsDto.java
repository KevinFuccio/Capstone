package com.capstone.payload;

import lombok.Data;

@Data
public class CommentsDto {

	private Long user_id;
	private Long product_id;
	private String comment;
	private int valutation;
}
