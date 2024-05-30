package com.app.xmart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.xmart.model.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer>{
    
}
