import React from 'react';
import { useAccount } from './hooks/useAccount';
import { useNotification } from './hooks/useNotification.tsx';
import { Header } from './components/layout/Header';
import { BalanceCard } from './components/account/BalanceCard';
import { TransactionForm } from './components/transaction/TransactionForm';
import { TransactionList } from './components/transaction/TransactionList';
import { Alert } from './components/ui/Alert';
import { formatCurrency, formatDate } from './utils/formatters';
import './styles/index.css';

const App: React.FC = () => {
  const {
    balance,
    transactions,
    loading,
    deposit,
    withdraw
  } = useAccount();

  const { notification, clearNotification } = useNotification();

  const handleDownload = () => {
    if (transactions.length === 0) {
      alert('No transactions to download');
      return;
    }

    let content = 'ACCOUNT STATEMENT\n=================\n\n';
    content += `Current Balance: ${formatCurrency(balance)}\n\n`;
    content += 'TRANSACTIONS\n' + '-'.repeat(60) + '\n';
    content += 'Date\t\tType\t\tAmount\t\tBalance\n' + '-'.repeat(60) + '\n';

    transactions.forEach(tx => {
      content += `${formatDate(tx.date)}\t${tx.type}\t\t${formatCurrency(tx.amount)}\t${formatCurrency(tx.balance)}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statement-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <Header onDownload={handleDownload} />
      
      <div className="notification-wrapper">
        {notification && (
          <Alert
            type={notification.type}
            message={notification.message}
            onClose={clearNotification}
          />
        )}
      </div>

      <BalanceCard balance={balance} />

      <div className="main-content">
        <TransactionForm
          onDeposit={deposit}
          onWithdraw={withdraw}
          loading={loading}
        />
        <TransactionList transactions={transactions} loading={loading} />
      </div>
    </div>
  );
};

export default App;