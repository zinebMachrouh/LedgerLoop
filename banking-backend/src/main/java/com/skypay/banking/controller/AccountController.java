package com.skypay.banking.controller;

import com.skypay.banking.dto.accountStatement.AccountStatementResponse;
import com.skypay.banking.dto.transaction.TransactionRequest;
import com.skypay.banking.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/deposit")
    public ResponseEntity<Map<String, Object>> deposit(
            @Valid @RequestBody TransactionRequest request) {
        log.info("Deposit request received: amount={}", request.getAmount());

        accountService.deposit(request.getAmount());

        return ResponseEntity.ok(Map.of(
                "message", "Deposit successful",
                "amount", request.getAmount(),
                "currentBalance", accountService.getBalance()
        ));
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Map<String, Object>> withdraw(
            @Valid @RequestBody TransactionRequest request) {
        log.info("Withdrawal request received: amount={}", request.getAmount());

        accountService.withdraw(request.getAmount());

        return ResponseEntity.ok(Map.of(
                "message", "Withdrawal successful",
                "amount", request.getAmount(),
                "currentBalance", accountService.getBalance()
        ));
    }

    @GetMapping("/statement")
    public ResponseEntity<AccountStatementResponse> getStatement() {
        log.info("Statement request received");

        AccountStatementResponse statement = accountService.getStatement();
        return ResponseEntity.ok(statement);
    }

    @GetMapping("/balance")
    public ResponseEntity<Map<String, Integer>> getBalance() {
        return ResponseEntity.ok(Map.of("balance", accountService.getBalance()));
    }
}