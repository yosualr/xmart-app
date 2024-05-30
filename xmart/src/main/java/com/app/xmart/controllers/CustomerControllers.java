package com.app.xmart.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.xmart.dto.UserLoginRequest;
import com.app.xmart.dto.UserLoginResponse;
import com.app.xmart.model.Customers;
import com.app.xmart.services.CustomersService;

@RestController
@RequestMapping("/customers")
public class CustomerControllers {
    
    @Autowired
    CustomersService customersService;

    @GetMapping("/list")
    public ResponseEntity<List<Customers>> getAllCustomers() {
        return ResponseEntity.ok(customersService.findAllCustomers());
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Optional<Customers>> getDataDetailCustomers(@PathVariable Integer customerId) {
        return ResponseEntity.ok(customersService.findByIdCustomers(customerId));
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> loginCustomer(@RequestBody UserLoginRequest userLoginRequest) {
        return ResponseEntity.ok(customersService.login(userLoginRequest));
    }
}
