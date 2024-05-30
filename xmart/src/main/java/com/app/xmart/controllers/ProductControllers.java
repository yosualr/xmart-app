package com.app.xmart.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.xmart.model.Products;
import com.app.xmart.services.ProductsService;

@RestController
@RequestMapping("/products")
public class ProductControllers {

    @Autowired
    ProductsService productsService;

    @GetMapping("/list")
    public ResponseEntity<List<Products>> getAllProducts() {
        return ResponseEntity.ok(productsService.findAllProducts());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Optional<Products>> getDataDetailCustomers(@PathVariable Integer productId) {
        return ResponseEntity.ok(productsService.findByIdProducts(productId));
    }
    
}
