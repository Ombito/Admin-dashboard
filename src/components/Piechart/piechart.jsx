import React, { useState, useEffect } from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';
import './piechart.css';

const Piechart = () => {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const fetchCategoryData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5555/product-categories');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const { data } = await response.json();
            setCategoryData(data);
        } catch (error) {
            console.error('Error fetching product categories:', error);
        }
    };

    const chartData = {
        labels: categoryData.map(category => category.category),
        datasets: [{
            label: 'Product Categories',
            data: categoryData.map(category => category.count),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div className="pie">
            <h3>Product Categories</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default Piechart;
