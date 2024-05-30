package com.app.xmart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.xmart.model.Transactions;
import com.app.xmart.services.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionControllers {
    @Autowired
    TransactionService transactionService;

    @GetMapping("/list")
    public ResponseEntity<List<Transactions>> getAllProducts() {
        return ResponseEntity.ok(transactionService.findAllTransactions());
    }
}
