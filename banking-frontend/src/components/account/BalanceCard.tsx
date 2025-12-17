import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <div className="balance-card">
      <div className="balance-label">
        Current Balance
      </div>
      <div className="balance-amount">{formatCurrency(balance)}</div>
      <div className="balance-subtitle">Available to withdraw</div>
      <div className="trend-icon"><img src="/trend.png" alt="Trend Up" /></div>
    </div>
  );
};