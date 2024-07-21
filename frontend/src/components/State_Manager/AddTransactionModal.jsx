import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../State_Manager/action";

const AddTransactionModal = ({
  isOpen,
  onClose,
  existingTransaction = null,
}) => {
  const [transaction, setTransaction] = useState({
    type: "Income",
    date: "",
    amount: "",
    category: "",
    currency: "INR",
    title: "",
    note: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (existingTransaction) {
      setTransaction(existingTransaction);
    } else {
      // Reset
      setTransaction({
        type: "Income",
        date: "",
        amount: "",
        category: "",
        currency: "INR",
        title: "",
        note: "",
      });
    }
  }, [existingTransaction]);

  const handleChange = useCallback((e) => {
    setTransaction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (existingTransaction) {
        dispatch(editTransaction(transaction));
      } else {
        dispatch(addTransaction({ ...transaction, id: Date.now().toString() }));
      }
      onClose();
    },
    [dispatch, transaction, existingTransaction, onClose]
  );

  const switchType = useCallback((type) => {
    setTransaction((prev) => ({
      ...prev,
      type: type,
      category: "", // Reset
    }));
  }, []);

  const incomeCategories = ["Salary", "Gift", "Returns", "Others"];
  const expenseCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Health",
    "Utilities",
    "Others",
  ];

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-55 flex justify-center items-center">
      <form className="bg-white card p-4 rounded w-[30%]" onSubmit={handleSubmit}>
        <div className="flex justify-evenly mb-4">
          <button
            type="button"
            onClick={() => switchType("Income")}
            className={`p-2 ${
              transaction.type === "Income"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => switchType("Expense")}
            className={`p-2 ${
              transaction.type === "Expense"
                ? "bg-orange-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Expense
          </button>
        </div>
        <div className="formelement space-y-4">
          <div className="flex items-center gap-5">
            <label htmlFor="date" className="w-[20%] text-right">
              Date:
            </label>
            <input
              name="date"
              type="date"
              value={transaction.date}
              onChange={handleChange}
              required
              className="w-[80%] mb-2 p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center gap-5">
            <label htmlFor="amount" className="w-[20%] text-right">
              Amount:
            </label>
            <input
              name="amount"
              type="number"
              value={transaction.amount}
              onChange={handleChange}
              required
              className="w-[80%] mb-2 p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center gap-5">
            <label htmlFor="category" className="w-[20%] text-right">
              Category:
            </label>
            <select
              name="category"
              value={transaction.category}
              onChange={handleChange}
              required
              className="w-[80%] mb-2 p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {(transaction.type === "Income"
                ? incomeCategories
                : expenseCategories
              ).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Removed Currency Dropdown */}
          {/* Currency is fixed to INR */}

          <div className="flex items-center gap-5">
            <label htmlFor="title" className="w-[20%] text-right">
              Title:
            </label>
            <input
              name="title"
              value={transaction.title}
              onChange={handleChange}
              required
              className="w-[80%] mb-2 p-2 border rounded-md"
            />
          </div>

          <div className="flex items-center gap-5">
            <label htmlFor="note" className="w-[20%] text-right">
              Note:
            </label>
            <textarea
              name="note"
              value={transaction.note}
              onChange={handleChange}
              className="w-[80%] mb-2 p-2 border rounded-md"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-800 text-white p-2 rounded mr-2"
            >
              {existingTransaction ? "Update Transaction" : "Add Transaction"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-black text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : null;
};

export default AddTransactionModal;
