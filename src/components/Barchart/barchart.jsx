import React, { useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import './barchart.css';

const Barchart = () => {
    const [userData, setUserData] = useState({
        labels: UserData.map(data => data.year),
        datasets: [{
            label: 'Top Selling Products',
            data: UserData.map(data => data.worth),
        }],
    });
    

  return (
    <div className="bar">
      <h3>Top Selling Products</h3>
      <Bar data={userData} />
    </div>
  );
};

export default Barchart;

export const UserData = [
    {
        id: 1,
        year: 2020,
        worth: 50000,
    },
    {
        id: 2,
        year: 2021,
        worth: 90000,
    },
    {
        id: 3,
        year: 2022,
        worth: 30000,
    },
];
