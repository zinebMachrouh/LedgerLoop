import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { useNotification } from '@/hooks/useNotification';

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
  const [date, setDate] = useState(getLocalToday());
  const todayStr = getLocalToday();
  const { showNotification } = useNotification();

  const handleSubmit = async (type: 'deposit' | 'withdraw') => {
    const numAmount = parseInt(amount);
    if (date > todayStr) {
      showNotification('error', 'Date cannot be in the future');
      return;
    }

    if (type === 'deposit') {
      await onDeposit(numAmount, date);
    } else {
      await onWithdraw(numAmount, date);
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

      <Input
        label="Date"
        type="date"
        value={date}
        max={todayStr}
        onChange={(e) => {
          const selected = e.target.value;
          if (selected > todayStr) {
            showNotification('error', 'Date cannot be in the future');
            setDate(todayStr);
            return;
          }
          setDate(selected);
        }}
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