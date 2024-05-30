package com.app.xmart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.xmart.model.Transactions;

@Repository
public interface TransactionsRepositories extends JpaRepository<Transactions, Integer>{

    
}
