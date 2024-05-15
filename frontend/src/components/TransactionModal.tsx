import React, { useState } from 'react';

interface EditTransactionModalProps {
  transaction: any;
  onClose: () => void;
  onSave: (transaction: any) => void;
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ transaction, onClose, onSave }) => {
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);
  const [description, setDescription] = useState(transaction.description);

  const handleSave = () => {
    onSave({ ...transaction, amount, category, description });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Transaction</h2>
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

export default EditTransactionModal;