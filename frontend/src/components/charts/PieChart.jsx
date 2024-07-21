import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const transactions = useSelector(state => state.transactions.transactions);

  const incomeCategories = transactions
    .filter(transaction => transaction.type === 'Income')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
      return acc;
    }, {});

  const data = {
    labels: Object.keys(incomeCategories),
    datasets: [{
      label: 'Income by Category',
      data: Object.values(incomeCategories),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          fontSize: 14,
        },
      },
    },
  };

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Pie data={data} height={200} options={options} />
    </div>
  );
}

export default PieChart;
