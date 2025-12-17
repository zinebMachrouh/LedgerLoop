export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface TransactionResponse {
  message: string;
  amount: number;
  currentBalance: number;
}