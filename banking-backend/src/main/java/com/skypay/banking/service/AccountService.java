package com.skypay.banking.service;

import com.skypay.banking.dto.accountStatement.AccountStatementResponse;

public interface AccountService {
    void deposit(Integer amount);
    void withdraw(Integer amount);
    AccountStatementResponse getStatement();
    Integer getBalance();
}