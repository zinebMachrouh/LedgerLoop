package com.skypay.banking.repository;

import com.skypay.banking.model.Transaction;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class TransactionRepository {

    private final List<Transaction> transactions = new ArrayList<>();

    public void save(Transaction transaction) {
        transactions.add(transaction);
    }

    public List<Transaction> findAll() {
        return new ArrayList<>(transactions);
    }

    public List<Transaction> findAllOrderByDateDesc() {
        List<Transaction> sortedTransactions = new ArrayList<>(transactions);
        Collections.reverse(sortedTransactions);
        return sortedTransactions;
    }

    public void clear() {
        transactions.clear();
    }
}