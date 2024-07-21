import React, { useState } from "react";
import Income_Expense from "./income&expense_tab/Income_Expense";
import TransactionTable from "./table/TransactionTable"; 

import AddTransactionModal from "./State_Manager/AddTransactionModal";  

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());


  return (
    <>
      <section id="section_1_header">
        <div className="navbar">
          <h1 className=" text-2xl font-bold">Codolio Assignment</h1>
        </div>

        {/* <div className="greeting_image flex justify-center">
          <img
            className="banner w-[35em] rounded-[20px]"
            src={banner}
            alt="banner"
          />
        </div> */}
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