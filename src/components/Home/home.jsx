// Home.jsx

import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import './home.css';

const Home = () => {
  // Sample data for line graph
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };


  const pieData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home Goods'],
    datasets: [
      {
        label: 'Product Distribution',
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50'
        ],
        data: [300, 50, 100, 200]
      }
    ]
  };

  return (
    <div className="home-container">
      <h2>Dashboard</h2>
      <div className="line-chart-container">
        <Line
          data={lineData}
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </div>
      
      <div className="pie-chart-container">
        <Pie
          data={pieData}
          options={{
            plugins: {
              legend: {
                position: 'right'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Home;
