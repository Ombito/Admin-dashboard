import React, { useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';


const Barchart = () => {
    const [userData, setUserData] = useState({
        labels: UserData.map(data => data.year),
        datasets: [{
            label: 'Year',
            data: UserData.map(data => data.worth),
        }],
    });
    

  return (
    <div className="">
      <h2>Barchart</h2>
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
