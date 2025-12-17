import { Transaction } from "./transaction.types";

export interface AccountStatement {
  currentBalance: number;
  transactions: Transaction[];
  totalDeposits: number;
  totalWithdrawals: number;
}

export interface TransactionRequest {
  amount: number;
}
