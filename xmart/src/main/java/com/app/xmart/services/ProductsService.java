package com.app.xmart.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.xmart.model.Products;
import com.app.xmart.repositories.ProductsRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductsService {
    
    @Autowired
    ProductsRepository productsRepository;

    public List<Products> findAllProducts(){
        return productsRepository.findAll();
    }

    public Optional<Products> findByIdProducts(Integer productId){
        try{
            Optional<Products> product = productsRepository.findById(productId);
            if (product == null) {
                throw new EntityNotFoundException("Product not found");
            }

            return product;

        }catch (Exception e){
            throw new EntityNotFoundException(e.getMessage());

        }
    }
}
