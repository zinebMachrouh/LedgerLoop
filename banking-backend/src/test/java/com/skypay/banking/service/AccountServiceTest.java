package com.skypay.banking.service;

import com.skypay.banking.dto.accountStatement.AccountStatementResponse;
import com.skypay.banking.exception.InsufficientFundsException;
import com.skypay.banking.exception.InvalidAmountException;
import com.skypay.banking.model.Transaction;
import com.skypay.banking.model.enums.TransactionType;
import com.skypay.banking.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private AccountServiceImpl accountService;

    @Captor
    private ArgumentCaptor<Transaction> transactionCaptor;

    private Transaction t1;
    private Transaction t2;
    private Transaction t3;

    @BeforeEach
    void setUp() {
        t1 = Transaction.builder()
                .date(LocalDate.now().minusDays(2))
                .type(TransactionType.DEPOSIT)
                .amount(1000)
                .balanceAfter(1000)
                .build();

        t2 = Transaction.builder()
                .date(LocalDate.now().minusDays(1))
                .type(TransactionType.DEPOSIT)
                .amount(2000)
                .balanceAfter(3000)
                .build();

        t3 = Transaction.builder()
                .date(LocalDate.now())
                .type(TransactionType.WITHDRAWAL)
                .amount(500)
                .balanceAfter(2500)
                .build();
    }


    @Test
    @DisplayName("Should deposit money successfully")
    void testDeposit() {
        accountService.deposit(1000);

        assertEquals(1000, accountService.getBalance());
        verify(transactionRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("Should handle multiple deposits")
    void testMultipleDeposits() {
        accountService.deposit(1000);
        accountService.deposit(2000);

        assertEquals(3000, accountService.getBalance());
        verify(transactionRepository, times(2)).save(any());
    }

    @Test
    @DisplayName("Should withdraw money successfully")
    void testWithdraw() {
        accountService.deposit(1000);
        accountService.withdraw(500);

        assertEquals(500, accountService.getBalance());
        verify(transactionRepository, times(2)).save(any());
    }

    @Test
    @DisplayName("Should throw exception when withdrawing more than balance")
    void testWithdrawInsufficientFunds() {
        accountService.deposit(1000);

        assertThrows(InsufficientFundsException.class,
                () -> accountService.withdraw(1500));

        verify(transactionRepository, times(1)).save(any());
    }

    @Test
    @DisplayName("Should throw exception for negative amount")
    void testNegativeAmount() {
        assertThrows(InvalidAmountException.class,
                () -> accountService.deposit(-100));

        verifyNoInteractions(transactionRepository);
    }

    @Test
    @DisplayName("Should throw exception for zero amount")
    void testZeroAmount() {
        assertThrows(InvalidAmountException.class,
                () -> accountService.withdraw(0));

        verifyNoInteractions(transactionRepository);
    }

    @Test
    @DisplayName("Should generate correct statement")
    void testGetStatement() {
        accountService.deposit(1000);
        accountService.deposit(2000);
        accountService.withdraw(500);

        when(transactionRepository.findAllOrderByDateDesc())
                .thenReturn(List.of(
                        t3,
                        t2,
                        t1
                ));

        AccountStatementResponse statement = accountService.getStatement();

        assertEquals(2500, statement.getCurrentBalance());
        assertEquals(3, statement.getTransactions().size());
        assertEquals(3000, statement.getTotalDeposits());
        assertEquals(500, statement.getTotalWithdrawals());
    }

    @Test
    @DisplayName("Deposit should save transaction with correct fields")
    void testDepositSavesCorrectTransaction() {
        accountService.deposit(1500);

        verify(transactionRepository).save(transactionCaptor.capture());
        Transaction saved = transactionCaptor.getValue();

        assertNotNull(saved.getDate());
        assertEquals(TransactionType.DEPOSIT, saved.getType());
        assertEquals(1500, saved.getAmount());
        assertEquals(1500, saved.getBalanceAfter());
    }

    @Test
    @DisplayName("Withdraw should save transaction with correct fields (second save)")
    void testWithdrawSavesCorrectTransaction() {
        accountService.deposit(2000);
        accountService.withdraw(500);

        verify(transactionRepository, times(2)).save(transactionCaptor.capture());
        List<Transaction> saved = transactionCaptor.getAllValues();

        Transaction withdrawalSaved = saved.get(1);
        assertNotNull(withdrawalSaved.getDate());
        assertEquals(TransactionType.WITHDRAWAL, withdrawalSaved.getType());
        assertEquals(500, withdrawalSaved.getAmount());
        assertEquals(1500, withdrawalSaved.getBalanceAfter());
    }

    @Test
    @DisplayName("Get statement when no transactions returns empty lists and zero totals")
    void testGetStatementEmpty() {
        when(transactionRepository.findAllOrderByDateDesc()).thenReturn(List.of());

        AccountStatementResponse statement = accountService.getStatement();

        assertEquals(accountService.getBalance(), statement.getCurrentBalance());
        assertNotNull(statement.getTransactions());
        assertEquals(0, statement.getTransactions().size());
        assertEquals(0, statement.getTotalDeposits());
        assertEquals(0, statement.getTotalWithdrawals());

        verify(transactionRepository, times(1)).findAllOrderByDateDesc();
    }
}
