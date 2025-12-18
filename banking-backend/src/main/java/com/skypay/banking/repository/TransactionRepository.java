package com.skypay.banking.repository;

import com.skypay.banking.model.Transaction;

import java.util.List;

public interface TransactionRepository {
    void save(Transaction transaction);
    List<Transaction> findAll();
    List<Transaction> findAllOrderByDateDesc();
    void clear();
}