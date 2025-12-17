package com.skypay.banking.dto.transaction;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private Integer amount;

}