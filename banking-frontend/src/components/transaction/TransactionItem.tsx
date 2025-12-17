import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Transaction, TransactionType } from '@/types/transaction.types';

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isDeposit = transaction.type === TransactionType.DEPOSIT;
  
  return (
    <div className="transaction-item">
      <div className="transaction-left">
        <div className={`transaction-icon ${transaction.type.toLowerCase()}`}>
          {isDeposit ? '⬇' : '⬆'}
        </div>
        <div className="transaction-details">
          <h4>{isDeposit ? 'Deposit' : 'Withdrawal'}</h4>
          <p>{formatDate(transaction.date)}</p>
        </div>
      </div>
      <div className="transaction-right">
        <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
          {isDeposit ? '+' : '-'}{formatCurrency(transaction.amount)}
        </div>
        <div className="transaction-balance">
          Balance: {formatCurrency(transaction.balance)}
        </div>
      </div>
    </div>
  );
};