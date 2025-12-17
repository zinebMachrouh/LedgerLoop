import { useState, useEffect, useCallback } from 'react';
import { accountApi } from '../api/endpoints/account';
import { useNotification } from './useNotification.tsx';
import { validateAmount } from '../utils/validators';
import { Transaction } from '@/types/transaction.types';
import { AccountStatement } from '@/types/account.types';

interface UseAccountReturn {
  balance: number;
  transactions: Transaction[];
  totalDeposits: number;
  totalWithdrawals: number;
  loading: boolean;
  deposit: (amount: number) => Promise<void>;
  withdraw: (amount: number) => Promise<void>;
  refreshStatement: () => Promise<void>;
}

export const useAccount = (): UseAccountReturn => {
  const [statement, setStatement] = useState<AccountStatement>({
    currentBalance: 0,
    transactions: [],
    totalDeposits: 0,
    totalWithdrawals: 0
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const fetchStatement = useCallback(async () => {
    try {
      setLoading(true);
      const data = await accountApi.getStatement();
      setStatement(data);
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Failed to load statement');
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  const deposit = useCallback(async (amount: number) => {
    const validationError = validateAmount(amount);
    if (validationError) {
      showNotification('error', validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await accountApi.deposit({ amount });
      showNotification('success', response.message);
      await fetchStatement();
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Deposit failed');
    } finally {
      setLoading(false);
    }
  }, [fetchStatement, showNotification]);

  const withdraw = useCallback(async (amount: number) => {
    const validationError = validateAmount(amount);
    if (validationError) {
      showNotification('error', validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await accountApi.withdraw({ amount });
      showNotification('success', response.message);
      await fetchStatement();
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  }, [fetchStatement, showNotification]);

  useEffect(() => {
    fetchStatement();
  }, [fetchStatement]);

  return {
    balance: statement.currentBalance,
    transactions: statement.transactions,
    totalDeposits: statement.totalDeposits,
    totalWithdrawals: statement.totalWithdrawals,
    loading,
    deposit,
    withdraw,
    refreshStatement: fetchStatement
  };
};