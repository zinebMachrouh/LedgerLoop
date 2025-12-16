package com.skypay.banking.model;

import com.skypay.banking.model.enums.TransactionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    private LocalDate date;
    private TransactionType type;
    private Integer amount;
    private Integer balanceAfter;
}