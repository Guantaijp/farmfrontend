import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Dashboard = ({monthlyAdminTotalsForAdminPrice, monthlyAdminTeaTotalsForAdminPrice }) => {


  const data = {
    labels: monthlyAdminTotalsForAdminPrice.map(([month, _]) => month), // Array of months
    datasets: [
      {
        label: 'Milk Amount Price',
        data: monthlyAdminTotalsForAdminPrice.map(([_, totals]) => totals.milk_amount_price), // Array of milk_amount_price values
        fill: false,
        borderColor: 'blue',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Milk  Price',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };
  

  const data2 = {
    labels: monthlyAdminTeaTotalsForAdminPrice.map(([month, _]) => month), // Array of months
    datasets: [
      {
        label: 'Tea Kilograms',
        data: monthlyAdminTeaTotalsForAdminPrice.map(([_, totals]) => totals), // Array of tea_amount_price values
        fill: false,
        borderColor: 'blue',
      },
    ],
  };

  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tea Kilos',
        },

      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };






  return (
<>
<div style={{ backgroundColor: "#F5F5F5" }} className="flex flex-col ml-0 lg:ml-80 ">
        <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
      <div className="overflow-hidden rounded-lg shadow-lg ml-20 mt-9 mx-9 w-2/3 h-half ">
        <div className="bg-neutral-50 py-4 px-9 text-center font-bold dark:bg-neutral-900 dark:text-neutral-800">
          Dairy chart
        </div>
        <div className="bg-white">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
    <div className="flex flex-row flex-wrap m-4 justify-center gap-5">
      <div className="overflow-hidden rounded-lg shadow-lg ml-20 mt-9 mx-9 w-2/3 h-half ">
        <div className="bg-neutral-50 py-4 px-9 text-center font-bold dark:bg-neutral-900 dark:text-neutral-800">
          Tea chart
          </div>
        <div className="bg-white">
          <Line data={data2} options={options2} />
          </div>
          </div>
          </div>
  </div>
</>

  );
};

export default Dashboard;
