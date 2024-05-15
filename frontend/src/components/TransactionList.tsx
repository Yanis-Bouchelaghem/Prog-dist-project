import React from 'react';
import TransactionItem from './TransactionItem';
import {useQuery} from '@tanstack/react-query'


const TransactionList: React.FC = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://127.0.0.1:8000/transaction/').then((res) =>
        res.json(),
      ),
  })

  
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      {data.map((transaction) => (
        <TransactionItem key={transaction.id} {...transaction} />
      ))}
    </div>
  );
};

export default TransactionList;