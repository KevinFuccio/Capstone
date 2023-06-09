package com.capstone.auth.payload;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.capstone.auth.entity.Role;
import com.capstone.entity.Address;
import com.capstone.entity.Cart;
import com.capstone.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class JWTAuthResponse {
	private Long id;
	private String username;
	private String email;
	private String password;
    private String accessToken;
    private String tokenType = "Bearer";
    private Set<Role> roles = new HashSet();
    private Cart cart= new Cart();
    private List<Address> address = new ArrayList<>();
}
