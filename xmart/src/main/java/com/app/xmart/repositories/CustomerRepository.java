package com.app.xmart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.xmart.model.Customers;

public interface CustomerRepository extends JpaRepository<Customers, Integer> {
    
}
