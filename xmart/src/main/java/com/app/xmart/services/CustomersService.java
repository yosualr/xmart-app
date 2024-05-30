package com.app.xmart.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.xmart.dto.UserLoginRequest;
import com.app.xmart.dto.UserLoginResponse;
import com.app.xmart.model.Customers;
import com.app.xmart.repositories.CustomerRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CustomersService {

    @Autowired
    CustomerRepository customerRepository;
    
    public List<Customers> findAllCustomers(){
        return customerRepository.findAll();
    }

    public Optional<Customers> findByIdCustomers(Integer customerId){
        try{
            Optional<Customers> cust = customerRepository.findById(customerId);
            if (cust == null) {
                throw new EntityNotFoundException("Customer not found");
            }

            return cust;

        }catch (Exception e){
            throw new EntityNotFoundException(e.getMessage());

        }
    }
    
    public UserLoginResponse login(UserLoginRequest userLoginRequest){
        try {
            Customers userExist = customerRepository.findById(userLoginRequest.getCustomerId())
            .orElseThrow(() -> new RuntimeException("User Not Found"));
            if (!userExist.getCustomerName().equals(userLoginRequest.getCustomerName())) {
                throw new RuntimeException("User Not Found");
            }
            UserLoginResponse userLoginResponse = new UserLoginResponse();
            userLoginResponse.setCustomerId(userExist.getCustomerId());
            userLoginResponse.setCustomerName(userExist.getCustomerName());
            userLoginResponse.setCustomerWallet(userExist.getCustomerWallet());
            
            return userLoginResponse;

        } catch (Exception e) {
            // TODO: handle exception
            throw new RuntimeException("Failed to login: " + e.getMessage(), e);
        }
    }
}
