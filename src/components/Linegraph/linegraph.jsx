import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import './linegraph.css';
import { Chart as ChartJS } from 'chart.js/auto';

const Linegraph = () => {
<<<<<<< HEAD
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const apiUrl = `http://127.0.0.1:5555/orders-per-month`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                const data  = await response.json();
                console.log('Fetched orders:', data); 
                setOrdersData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchOrdersData();
    }, []);

    
    const chartData = {
        labels: ordersData.map(data => data.month),
        datasets: [{
            label: 'Orders per Month',
            data: ordersData.map(data => data.orders_count),
            fill: true,
            backgroundColor: '#00aeee',
            borderColor: 'rgba(54, 162, 235)',
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 0.1,
        }]
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                },
                grid: {
                    display: false
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Orders'
                },
                grid: {
                    display: false,
                    beginAtZero: true,
                }
            }
        }
    };


    return (
        <div className="line">
            <h3>Orders Overview</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Line data={chartData} options={chartOptions}/>
            )}
        </div>
    );
=======
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
>>>>>>> 4a465f2bbb777fc8f713333db3a4c7c324818f04
};


export default Linegraph;
