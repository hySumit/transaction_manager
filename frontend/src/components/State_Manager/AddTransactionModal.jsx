import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, editTransaction } from '../State_Manager/action';

const AddTransactionModal = ({ isOpen, onClose, existingTransaction = null }) => {
  const [transaction, setTransaction] = useState({
    type: 'Income', 
    date: '',
    amount: '',
    category: '',
    currency: 'INR', 
    title: '',
    note: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (existingTransaction) {
      setTransaction(existingTransaction);
    } else {
      // Reset 
      setTransaction({
        type: 'Income',
        date: '',
        amount: '',
        category: '',
        currency: 'INR', 
        title: '',
        note: ''
      });
    }
  }, [existingTransaction]);

  const handleChange = useCallback((e) => {
    setTransaction(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (existingTransaction) {
      dispatch(editTransaction(transaction));
    } else {
      dispatch(addTransaction({ ...transaction, id: Date.now().toString() }));
    }
    onClose();
  }, [dispatch, transaction, existingTransaction, onClose]);

  const switchType = useCallback((type) => {
    setTransaction(prev => ({
      ...prev,
      type: type,
      category: '' // Reset
    }));
  }, []);

  const incomeCategories = ['Salary', 'Gift', 'Returns', 'Others'];
  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Others'];

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <form className="bg-white p-4 rounded w-96" onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
          <button 
            type="button" 
            onClick={() => switchType('Income')}
            className={`p-2 ${transaction.type === 'Income' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Income
          </button>
          <button 
            type="button" 
            onClick={() => switchType('Expense')}
            className={`p-2 ${transaction.type === 'Expense' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Expense
          </button>
        </div>

        <label htmlFor="date">Date</label>
        <input name="date" type="date" value={transaction.date} onChange={handleChange} required className="w-full mb-2 p-2 border" />

        <label htmlFor="amount">Amount</label>
        <input name="amount" type="number" value={transaction.amount} onChange={handleChange} required className="w-full mb-2 p-2 border" />

        <label htmlFor="category">Category</label>
        <select name="category" value={transaction.category} onChange={handleChange} required className="w-full mb-2 p-2 border">
          <option value="">Select Category</option>
          {(transaction.type === 'Income' ? incomeCategories : expenseCategories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Removed Currency Dropdown */}
        {/* Currency is fixed to INR */}

        <label htmlFor="title">Title</label>
        <input name="title" value={transaction.title} onChange={handleChange} required className="w-full mb-2 p-2 border" />

        <label htmlFor="note">Note</label>
        <textarea name="note" value={transaction.note} onChange={handleChange} className="w-full mb-2 p-2 border"></textarea>

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
            {existingTransaction ? 'Update Transaction' : 'Add Transaction'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  ) : null;
};

export default AddTransactionModal;
