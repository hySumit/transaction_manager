import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import banner from "../assets/images/banner.png";
import Income_Expense from "./income&expense_tab/Income_Expense";
import TransactionTable from "./table/TransactionTable"; 

import AddTransactionModal from "./State_Manager/AddTransactionModal"; 

// import DateNavigation from "./State_Manager/DateNavigation"; 
// import { setFilters } from './State_Manager/action' 

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.transactions);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  // const handleFilterChange = (filterType, value) => {
  //   dispatch(setFilters({ [filterType]: value }));
  // };

  return (
    <>
      <section id="section_1_header">
        <div className="navbar">
          <h1 className=" text-2xl font-bold">Codolio Assignment</h1>
        </div>

        <div className="greeting_image flex justify-center">
          <img
            className="banner w-[35em] rounded-[20px]"
            src={banner}
            alt="banner"
          />
        </div>
      </section>

      <section className="income_exense">
        <Income_Expense />
      </section>

      <section className="transaction_table">
        <TransactionTable />
      </section>

      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Home;