import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../State_Manager/action'; 
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import AddTransactionModal from '../State_Manager/AddTransactionModal'; 

const currencySymbols = {
  INR: '₹',
};

const TransactionTable = () => {
  const { transactions } = useSelector(state => state.transactions);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    currency: 'INR'  
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (transaction) => {
    setIsEditMode(true);
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  const getFilteredTransactions = () => {
    return transactions
      .filter(transaction => 
        (!filters.type || transaction.type === filters.type) &&
        (!filters.category || transaction.category === filters.category) &&
        (!filters.search || transaction.title.toLowerCase().includes(filters.search.toLowerCase())) &&
        transaction.currency === filters.currency  // Filter by currency
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort transactions by date
  };

  const groupedTransactions = getFilteredTransactions().reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'short' });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <input 
          type="text" 
          placeholder="Search by Title" 
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          className="border p-2 rounded-[15px] w-[30%]" 
        />
        <select 
          name="type" 
          value={filters.type}
          onChange={handleFilterChange}
          className="border p-2 rounded-[15px]"
        >
          <option value="">Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select 
          name="category" 
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded-[15px]"
        >
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Utilities">Utilities</option>
          <option value="Others">Others</option>
        </select>
        {/* <select 
          name="currency" 
          value={filters.currency}
          disabled  // Disable currency selection
          className="border p-2 rounded-[15px]"
        >
          <option value="INR">INR</option>
        </select> */}
        <button onClick={handleAddClick} className="btn text-[50px] text-red-500 absolute right-[4.5em] btn-primary"><IoMdAddCircle /></button>
      </div>

      {Object.keys(groupedTransactions).map(date => {
        const transactionsForDate = groupedTransactions[date];
        const totalIncome = transactionsForDate
          .filter(transaction => transaction.type === 'Income')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
        const totalExpense = transactionsForDate
          .filter(transaction => transaction.type === 'Expense')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

        return (
          <div key={date} className="mb-4">
            <div className="flex m-auto justify-between items-center w-[50%] bg-gray-100 p-4 border rounded-lg shadow-md">
              <span className="font-bold text-lg">{date}</span>
              
              <div className="flex gap-3">
                <p className='font-bold'>Total : </p>
                <div className="text-green-500 font-bold text-lg">
                  {currencySymbols['INR']} {totalIncome.toFixed(2)}
                </div>
                <div className="text-red-500 font-bold text-lg">
                  {currencySymbols['INR']} {totalExpense.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="border rounded-lg w-[50%] bg-white m-auto shadow-md mt-2">
              {transactionsForDate.map(transaction => {
                const titleHighlighted = transaction.title.replace(
                  new RegExp(filters.search, 'gi'), 
                  match => `<span class="bg-yellow-200">${match}</span>`
                );

                return (
                  <div key={transaction.id} className="flex justify-between items-center border-b p-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-white text-sm ${transaction.type === 'Expense' ? 'bg-red-500' : 'bg-green-500'}`}>
                        {transaction.category}
                      </span>
                      <span className="text-lg font-bold" dangerouslySetInnerHTML={{ __html: titleHighlighted }}></span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-lg ${transaction.type === 'Expense' ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}`}>
                        {currencySymbols['INR']} {transaction.amount}
                      </span>
                      <button 
                        onClick={() => handleEditClick(transaction)}
                        className="text-blue-500 text-2xl hover:text-blue-700"
                      >
                        <MdEdit />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(transaction.id)}
                        className="text-red-500 text-2xl hover:text-red-700"
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {isModalOpen && (
        <AddTransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          existingTransaction={selectedTransaction} 
          isEditMode={isEditMode} 
        />
      )}
    </div>
  );
};

export default TransactionTable;
