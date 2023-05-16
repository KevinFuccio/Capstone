package com.capstone.payload;

import lombok.Data;

@Data
public class AddressDto {
	private String city;
	private String streetName;
	private String postalCode;
	private String region;
}
