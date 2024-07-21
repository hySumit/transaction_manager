import React from 'react';
import { useSelector } from 'react-redux';
import PieChart from '../charts/PieChart';
import DoughnutChart from '../charts/DoughnutChart';
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineFall } from "react-icons/ai";

const Income_Expense = () => {
  const transactions = useSelector(state => state.transactions.transactions);

  // Calculate total income
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'Income')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  // Calculate total expense
  const totalExpense = transactions
    .filter(transaction => transaction.type === 'Expense')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  return (
    <div id="income_expense">
      <div className="money_container mt-5 flex justify-center gap-[2em]">

        <div className="income rounded-[20px] border p-5 border-green-500 bg-green-200">
          <div className="box border border-white p-2">
            <PieChart />
          </div>

          <div className="flex justify-center gap-[20px] items-center">
            <div className="wallet_icon border border-green-900 p-2 rounded-[9px] bg-green-500 text-white">
              <AiOutlineRise />
            </div>
            <div className="text-green-600">
              <p>Your Income</p>
              <h3>RS. {totalIncome.toFixed(2)}</h3> {/* Display total income */}
            </div>
          </div>
        </div>

        <div className="expense p-5 rounded-[20px] border border-red-500 bg-red-200">
          <div className="box border border-white p-2">
            <DoughnutChart />
          </div>

          <div className="flex justify-center gap-[20px] items-center">
            <div className="wallet_icon border border-red-900 p-2 rounded-[9px] bg-red-500 text-white">
              <AiOutlineFall />
            </div>
            <div className="text-red-500">
              <p>Your Expense</p>
              <h3>RS. {totalExpense.toFixed(2)}</h3> {/* Display total expense */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Income_Expense;
