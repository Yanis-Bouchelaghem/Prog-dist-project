import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TransactionItem from './TransactionItem';
import axios from 'axios';

// Fetch transactions
const fetchTransactions = async () => {
  const response = await axios.get('http://127.0.0.1:8000/transaction/');
  return response.data;
};

// Delete transaction
const deleteTransaction = async (id: number) => {
  await axios.delete(`http://127.0.0.1:8000/transaction/${id}`);
};

const TransactionList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({queryKey: ['transactions'], queryFn: fetchTransactions});

  const mutation = useMutation({mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
    <div className="transaction-list">
      <h1>Transactions</h1>
      {data.map((transaction: any) => (
        <TransactionItem key={transaction.id} {...transaction} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TransactionList;