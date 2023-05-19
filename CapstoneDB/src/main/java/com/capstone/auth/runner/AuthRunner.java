package com.capstone.auth.runner;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.capstone.auth.entity.Role;
import com.capstone.auth.repository.RoleRepository;
import com.capstone.auth.repository.UserRepository;
import com.capstone.auth.service.AuthService;
import com.capstone.entity.Product;
import com.capstone.entity.ProductCategory;
import com.capstone.entity.ProductVariant;
import com.capstone.entity.ShippingMethod;
import com.capstone.entity.StatusOrder;
import com.capstone.enums.Category_Name;
import com.capstone.enums.ERole;
import com.capstone.enums.Shipping_method;
import com.capstone.enums.Status_Order;
import com.capstone.enums.Variant_Enum;
import com.capstone.repository.ProductCategoryRepository;
import com.capstone.repository.ProductRepository;
import com.capstone.repository.ProductVariantRepository;
import com.capstone.repository.ShippingMethodRepository;
import com.capstone.repository.StatusOrderRepository;




@Component
public class AuthRunner implements ApplicationRunner {
	
	@Autowired RoleRepository roleRepository;
	@Autowired UserRepository userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired AuthService authService;
	@Autowired
	ProductCategoryRepository productRepo;
	@Autowired
	ShippingMethodRepository shippingRepo;
	@Autowired
	StatusOrderRepository statusRepo;
	@Autowired
	ProductVariantRepository variantRepo;
	@Autowired
	ProductRepository prodRepo;
	
	private Set<Role> adminRole;
	private Set<Role> moderatorRole;
	private Set<Role> userRole;
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		//setProductVariantDefault();
		//setRoleDefault();
		//setCategoryDefault();
		//setShippingDefault();
		//setStatusOrderDefault();
		addVariantToProduct();
		
	}
	
	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);
		
		Role user = new Role();
		user.setRoleName(ERole.ROLE_USER);
		roleRepository.save(user);
		
		Role moderator = new Role();
		moderator.setRoleName(ERole.ROLE_MODERATOR);
		roleRepository.save(moderator);
		
		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(moderator);
		adminRole.add(user);
		
		moderatorRole = new HashSet<Role>();
		moderatorRole.add(moderator);
		moderatorRole.add(user);
		
		userRole = new HashSet<Role>();
		userRole.add(user);
	}
	private void setCategoryDefault() {
		ProductCategory food = new ProductCategory();
		food.setName(Category_Name.FOOD);
		productRepo.save(food);
		ProductCategory plant = new ProductCategory();
		plant.setName(Category_Name.PLANT);
		productRepo.save(plant);
		ProductCategory seed = new ProductCategory();
		seed.setName(Category_Name.SEED);
		productRepo.save(seed);		
	}
	private void setShippingDefault() {
		ShippingMethod standard = new ShippingMethod();
		standard.setName(Shipping_method.STANDARD);
		shippingRepo.save(standard);
		ShippingMethod express = new ShippingMethod();
		express.setName(Shipping_method.EXPRESS);
		shippingRepo.save(express);
		ShippingMethod oneDay = new ShippingMethod();
		oneDay.setName(Shipping_method.ONE_DAY);
		shippingRepo.save(oneDay);		
	}
	private void setStatusOrderDefault() {
		StatusOrder INITIALIZED = new StatusOrder();
		INITIALIZED.setName(Status_Order.INITIALIZED);
		statusRepo.save(INITIALIZED);
		
		StatusOrder PENDING = new StatusOrder();
		PENDING.setName(Status_Order.PENDING);
		statusRepo.save(PENDING);
		
		StatusOrder DELIVERED = new StatusOrder();
		DELIVERED.setName(Status_Order.DELIVERED);
		statusRepo.save(DELIVERED);
		
	}
	private void setProductVariantDefault() {
		ProductVariant S = new ProductVariant();
		S.setVariant(Variant_Enum.S);
		variantRepo.save(S);
		
		ProductVariant M = new ProductVariant();
		M.setVariant(Variant_Enum.M);
		variantRepo.save(M);
		
		ProductVariant L = new ProductVariant();
		L.setVariant(Variant_Enum.L);
		variantRepo.save(L);
		
	}
	private void addVariantToProduct() {
		List<Product> p = prodRepo.findAll();
		Set<ProductVariant> pv = new HashSet<>();
		List<ProductVariant> pvl = variantRepo.findAll();
		pvl.forEach(e-> pv.add(e));
				
		p.forEach(e->{
			if(e.getProductVariant().contains(pv)) {
				
			}else {				
				e.setProductVariant(pv);
				prodRepo.save(e);
			}
		
		});
	
	}

}
