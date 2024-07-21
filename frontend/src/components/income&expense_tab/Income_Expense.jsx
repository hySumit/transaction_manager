import React from 'react'
import PieChart from '../charts/PieChart'
import DoughnutChart from '../charts/DoughnutChart'
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineFall } from "react-icons/ai";

const Income_Expense = () => {
  return (
    <div id="income_expense">
        <div className="money_container mt-5 flex justify-center gap-[2em]">

          <div className="income rounded-[20px] border p-5 border-green-500 bg-green-200">
          <div className="box border border-white p-2">
            <PieChart/>
          </div>  
          
          <div className="flex justify-center gap-[20px] items-center">

            <div className="wallet_icon border border-green-900 p-2 rounded-[9px] bg-green-500 text-white">
            <AiOutlineRise />
            </div>
            <div className="text-green-600">
              <p>Your Income</p>
              <h3> RS. 5000</h3>
              
            </div>
          </div>
          </div>

          <div className="expense p-5 rounded-[20px] border border-red-500 bg-red-200">

          <div className="box border border-white p-2">
            <DoughnutChart/>
          </div>

          <div className="flex justify-center gap-[20px] items-center">

          <div className="wallet_icon border border-red-900 p-2 rounded-[9px] bg-red-500 text-white">
          <AiOutlineFall />
            </div>
            <div className="text-red-500">
              <p>Your Expense</p>
              <h3> RS. 5000</h3>
            </div>
          </div>
          </div>
        </div>
      </div>
  )
}

export default Income_Expense