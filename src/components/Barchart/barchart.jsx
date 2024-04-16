import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './barchart.css';

const Barchart = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const apiUrl = `http://127.0.0.1:5555/top-products`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                const { data } = await response.json();
                console.log('Fetched orders:', data); 
                setProductData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchTopProducts();
    }, []);

    if (!productData || productData.length === 0) {
        return <div>Loading...</div>;
    }

    const colors = [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)'
    ];

    const chartData = {
        labels: productData.map(product => product.product_name),
        datasets: [{
            label: 'Product',
            data: productData.map(product => product.num_orders),
            backgroundColor: colors.slice(0, productData.length),
            borderColor: colors.slice(0, productData.length),
            borderWidth: 1
        }]
    };

    const chartOptions = {
        scales: {
            x: {
                grid: {
                    display: false 
                }
            },
            y: {
                grid: {
                    display: false 
                }
            }
        }
    };
   

    return (
        <div className="bar">
            <h3>Top Selling Products</h3>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default Barchart;
