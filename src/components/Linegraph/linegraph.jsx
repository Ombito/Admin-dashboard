import React, { useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import './linegraph.css';

const Linegraph = () => {
    const [userData, setUserData] = useState({
        labels: UserData.map(data => data.year),
        datasets: [{
            label: 'Sale3 per Month',
            data: UserData.map(data => data.worth),
        }],
    });
    

  return (
    <div className="line">
      <h3>Sales Overview</h3>
      <Line data={userData} />
    </div>
  );
};

export default Linegraph;

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
