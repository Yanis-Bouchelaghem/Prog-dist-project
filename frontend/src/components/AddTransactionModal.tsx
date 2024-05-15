import React, { useState } from 'react';

interface AddTransactionModalProps {
  onClose: () => void;
  onSave: (transaction: any) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onSave }) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const newTransaction = {
      amount,
      category,
      description,
      timestamp: new Date().toISOString(), // or any other timestamp you want to use
    };
    onSave(newTransaction);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Transaction</h2>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTransactionModal;