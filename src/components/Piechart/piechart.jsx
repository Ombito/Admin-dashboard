import React, { useState } from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import './piechart.css';

const Piechart = () => {
    const [userData, setUserData] = useState({
        labels: UserData.map(data => data.year),
        datasets: [{
            label: 'category',
            data: UserData.map(data => data.worth),
        }],
    });
    

  return (
    <div className="pie">
      <h2>Product Category Distribution</h2>
      <Pie data={userData} />
    </div>
  );
};

export default Piechart;

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
