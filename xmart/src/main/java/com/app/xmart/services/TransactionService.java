package com.app.xmart.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.xmart.model.Transactions;
import com.app.xmart.repositories.TransactionsRepositories;

@Service
public class TransactionService {
    @Autowired
    TransactionsRepositories transactionsRepositories;

    public List<Transactions> findAllTransactions(){
        return transactionsRepositories.findAll();
    }
}
