import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TransactionItem from './TransactionItem';
import axios from 'axios';
import EditTransactionModal from './TransactionModal';
import AddTransactionModal from './AddTransactionModal';

// Fetch transactions
const fetchTransactions = async () => {
  const response = await axios.get('http://127.0.0.1:8000/transaction/');
  return response.data;
};

// Delete transaction
const deleteTransaction = async (id: number) => {
  await axios.delete(`http://127.0.0.1:8000/transaction/${id}`);
};

// Update transaction
const updateTransaction = async (transaction: any) => {
  await axios.put(`http://127.0.0.1:8000/transaction/${transaction.id}`, transaction);
};

// Add transaction
const addTransaction = async (transaction: any) => {
  await axios.post('http://127.0.0.1:8000/transaction/', transaction);
};

const TransactionList: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, error, isLoading } = useQuery({queryKey: ['transactions'], queryFn: fetchTransactions});

  const deleteMutation = useMutation({mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const updateMutation = useMutation({mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    }
  });

  const addMutation = useMutation({mutationFn : addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions']});
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setIsAddModalOpen(false);
  };


  const handleSaveTransaction = (transaction: any) => {
    updateMutation.mutate(transaction);
    setSelectedTransaction(null);
  };


  const handleAddTransaction = (transaction: any) => {
    addMutation.mutate(transaction);
    setIsAddModalOpen(false);
  };



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
    <div className="transaction-list">
      <h1>Transactions</h1>
      <div className="add-transaction-button">
        <button onClick={() => setIsAddModalOpen(true)}>Add Transaction</button>
      </div>
      {data.map((transaction: any) => (
        <TransactionItem key={transaction.id} {...transaction} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
      {selectedTransaction && (
        <EditTransactionModal
          transaction={selectedTransaction}
          onClose={handleCloseModal}
          onSave={handleSaveTransaction}
        />
      )}
      {isAddModalOpen && (
        <AddTransactionModal
          onClose={handleCloseModal}
          onSave={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default TransactionList;