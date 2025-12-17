import { apiClient } from '../client';
import { AccountStatement, TransactionRequest, TransactionResponse } from '../../types';

const ENDPOINTS = {
  DEPOSIT: '/accounts/deposit',
  WITHDRAW: '/accounts/withdraw',
  STATEMENT: '/accounts/statement',
  BALANCE: '/accounts/balance'
} as const;

export const accountApi = {
  deposit: async (request: TransactionRequest): Promise<TransactionResponse> => {
    const { data } = await apiClient.post<TransactionResponse>(ENDPOINTS.DEPOSIT, request);
    return data;
  },

  withdraw: async (request: TransactionRequest): Promise<TransactionResponse> => {
    const { data } = await apiClient.post<TransactionResponse>(ENDPOINTS.WITHDRAW, request);
    return data;
  },

  getStatement: async (): Promise<AccountStatement> => {
    const { data } = await apiClient.get<AccountStatement>(ENDPOINTS.STATEMENT);
    return data;
  },

  getBalance: async (): Promise<number> => {
    const { data } = await apiClient.get<{ balance: number }>(ENDPOINTS.BALANCE);
    return data.balance;
  }
};