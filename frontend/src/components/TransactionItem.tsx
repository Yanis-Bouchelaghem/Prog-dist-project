import React from 'react';
import TransactionItemProps from '../interfaces/TransactionItemProps';

const TransactionItem: React.FC<TransactionItemProps> = ({ amount, category, description, timestamp }) => {
  return (
    <div className="transaction-item">
      <div className="transaction-details">
        <div><span>{new Date(timestamp).toLocaleDateString()}</span></div>
        <div><span>{category}</span></div>
        <div><span>{description}</span></div>
        <div><span>{amount.toFixed(2)} €</span></div>
      </div>
    </div>
  );
};

export default TransactionItem;