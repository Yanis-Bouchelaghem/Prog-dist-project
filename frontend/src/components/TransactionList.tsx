import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList: React.FC = () => {
  const transactions = [
    { id: 1, amount: 1380.77, category: 'Business', description: 'Consulting Services', timestamp: '2018-04-07T10:30:00Z' },
    { id: 2, amount: 1200.50, category: 'Office Supplies', description: 'Office Chairs', timestamp: '2018-04-03T11:00:00Z' },
    { id: 3, amount: 980.33, category: 'Travel', description: 'Airline Tickets', timestamp: '2018-04-02T09:45:00Z' },
    { id: 4, amount: 1500.00, category: 'Software', description: 'Software Licenses', timestamp: '2018-03-24T15:00:00Z' },
    // Add more transactions as needed
  ];

  return (
    <div className="transaction-list">
      <h1>Transactions</h1>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
};

export default TransactionList;