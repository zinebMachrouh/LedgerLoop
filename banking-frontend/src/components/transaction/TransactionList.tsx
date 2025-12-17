import React from 'react';
import { TransactionItem } from './TransactionItem';
import { Card } from '../ui/Card';
import { Transaction } from '@/types/transaction.types';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  loading
}) => {
  if (loading && transactions.length === 0) {
    return (
      <Card>
        <div className="empty-state">
          <div className="loading-spinner">⏳</div>
          <p>Loading transactions...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="card-title">
        Transaction History
      </h2>
      
      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🧾</div>
          <div className="empty-title">No transactions yet</div>
          <div className="empty-subtitle">Start by making a deposit or withdrawal</div>
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
        </div>
      )}
    </Card>
  );
};