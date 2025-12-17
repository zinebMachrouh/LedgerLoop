import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface TransactionFormProps {
  onDeposit: (amount: number, date?: string) => Promise<void>;
  onWithdraw: (amount: number, date?: string) => Promise<void>;
  loading: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onDeposit,
  onWithdraw,
  loading
}) => {
  const getLocalToday = () => {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [amount, setAmount] = useState('');

  const handleSubmit = async (type: 'deposit' | 'withdraw') => {
    const numAmount = parseInt(amount);
    

    if (type === 'deposit') {
      await onDeposit(numAmount);
    } else {
      await onWithdraw(numAmount);
    }
    setAmount('');
  };

  return (
    <Card>
      <h2 className="card-title">New Transaction</h2>

      <Input
        label="Amount"
        type="number"
        placeholder="$ 0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={loading}
      />


      <div className="button-group">
        <Button
          variant="primary"
          icon="⬇"
          onClick={() => handleSubmit('deposit')}
          disabled={!amount || loading}
          loading={loading}
        >
          Deposit
        </Button>
        <Button
          variant="secondary"
          icon="⬆"
          onClick={() => handleSubmit('withdraw')}
          disabled={!amount || loading}
          loading={loading}
        >
          Withdraw
        </Button>
      </div>
    </Card>
  );
};