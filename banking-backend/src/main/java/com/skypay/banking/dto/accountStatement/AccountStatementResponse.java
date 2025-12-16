package com.skypay.banking.dto.accountStatement;

import com.skypay.banking.dto.transaction.TransactionResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountStatementResponse {
    private Integer currentBalance;
    private List<TransactionResponse> transactions;
    private Integer totalDeposits;
    private Integer totalWithdrawals;
}