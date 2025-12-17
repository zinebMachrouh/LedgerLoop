package com.skypay.banking.service;

import com.skypay.banking.dto.accountStatement.AccountStatementResponse;
import com.skypay.banking.dto.transaction.TransactionResponse;
import com.skypay.banking.exception.InsufficientFundsException;
import com.skypay.banking.exception.InvalidAmountException;
import com.skypay.banking.model.Transaction;
import com.skypay.banking.model.enums.TransactionType;
import com.skypay.banking.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final TransactionRepository transactionRepository;
    private Integer balance = 0;

    @Override
    public void deposit(Integer amount) {
        validateAmount(amount);

        balance += amount;

        Transaction transaction = Transaction.builder()
                .date(LocalDate.now())
                .type(TransactionType.DEPOSIT)
                .amount(amount)
                .balanceAfter(balance)
                .build();

        transactionRepository.save(transaction);
        log.info("Deposit successful: amount={}, newBalance={}", amount, balance);
    }

    @Override
    public void withdraw(Integer amount) {
        validateAmount(amount);

        if (amount > balance) {
            log.warn("Withdrawal failed: insufficient funds. Requested={}, Available={}",
                    amount, balance);
            throw new InsufficientFundsException(
                    String.format("Insufficient funds. Available: %d, Requested: %d",
                            balance, amount));
        }

        balance -= amount;

        Transaction transaction = Transaction.builder()
                .date(LocalDate.now())
                .type(TransactionType.WITHDRAWAL)
                .amount(amount)
                .balanceAfter(balance)
                .build();

        transactionRepository.save(transaction);
        log.info("Withdrawal successful: amount={}, newBalance={}", amount, balance);
    }

    @Override
    public AccountStatementResponse getStatement() {
        List<Transaction> transactions = transactionRepository.findAllOrderByDateDesc();

        List<TransactionResponse> transactionResponses = transactions.stream()
                .map(this::mapToTransactionResponse)
                .collect(Collectors.toList());

        Integer totalDeposits = transactions.stream()
                .filter(t -> t.getType() == TransactionType.DEPOSIT)
                .mapToInt(Transaction::getAmount)
                .sum();

        Integer totalWithdrawals = transactions.stream()
                .filter(t -> t.getType() == TransactionType.WITHDRAWAL)
                .mapToInt(Transaction::getAmount)
                .sum();

        return AccountStatementResponse.builder()
                .currentBalance(balance)
                .transactions(transactionResponses)
                .totalDeposits(totalDeposits)
                .totalWithdrawals(totalWithdrawals)
                .build();
    }

    @Override
    public Integer getBalance() {
        return balance;
    }

    private void validateAmount(Integer amount) {
        if (amount == null || amount <= 0) {
            throw new InvalidAmountException("Amount must be greater than zero");
        }
    }

    private TransactionResponse mapToTransactionResponse(Transaction transaction) {
        return TransactionResponse.builder()
                .date(transaction.getDate())
                .type(transaction.getType().name())
                .amount(transaction.getAmount())
                .balance(transaction.getBalanceAfter())
                .build();
    }
}