import React, { useState, useEffect } from 'react'
import Barchart from '../Barchart/barchart';
import Piechart from '../Piechart/piechart';
import Linegraph from '../Linegraph/linegraph';
import './home.css';
import { FaMoneyBillAlt, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa';


const Home = () => {
  const [loading, setLoading] = useState(true);



  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-stats-container">
        <div className="dashboard-stat">
          <FaMoneyBillAlt color='#85bc2b' className="dashboard-icon" />
          <div>
            <p>Total Sales</p>
            <h3 style={{color:'#85bc2b'}}>230k</h3>
          </div>
        </div>
        <div className="dashboard-stat">
          <FaShoppingCart color='orange' className="dashboard-icon" />
          <div>
            <p>Products Sold</p>
            <h3 style={{color:'orange'}}>62,108</h3>
          </div>
        </div>
        <div className="dashboard-stat">
          <FaDollarSign color='red' className="dashboard-icon" />
          <div>
            <p>Total Earnings</p>
            <h3 style={{color:'red'}}>$1,230</h3>
          </div>
        </div>
        <div className="dashboard-stat">
          <FaUsers color='purple' className="dashboard-icon" />
          <div>
            <p>Total Customers</p>
            <h3  style={{color:'purple'}}>4k</h3>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <div className="chart-container">
          <Linegraph />
          <Piechart />
          <Barchart />
        </div>
        <div className="chart-containe">
          <h3>Recent Orders</h3>
          <table className="product-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Order Date</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home;