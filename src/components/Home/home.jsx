import React, { useState, useEffect } from 'react'
import Barchart from '../Barchart/barchart';
import Piechart from '../Piechart/piechart';
import Linegraph from '../Linegraph/linegraph';
import './home.css';
import { FaMoneyBillAlt, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa';


const Home = () => {
  const [groupingFilter, setGroupingFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleGroupingFilterChange = (e) => {
    setGroupingFilter(e.target.value);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-stats-container">
        <div className="dashboard-stat">
          <FaMoneyBillAlt color='#85bc2b' className="dashboard-icon" />
          <div>
            <p>Total Sales</p>
            <h3  style={{color:'#85bc2b'}}>230k</h3>
          </div>
        </div>
        <div className="dashboard-stat">
          <FaShoppingCart color='orange' className="dashboard-icon" />
          <div>
            <p>Products Sold</p>
            <h3 style={{color:'orange'}}>230k</h3>
          </div>
        </div>
        <div className="dashboard-stat">
          <FaDollarSign color='red' className="dashboard-icon" />
          <div>
            <p>Total Earnings</p>
            <h3 style={{color:'red'}}>230k</h3>
          </div>
        </div>
        <div className="dashboard-stat">
          <FaUsers color='purple' className="dashboard-icon" />
          <div>
            <p>Total Customers</p>
            <h3  style={{color:'purple'}}>230k</h3>
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
                <th>Name</th>
                <th>
                  Category: 
                  <select value={categoryFilter} onChange={handleCategoryFilterChange}>
                    <option value="All">All</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Phones">Phones</option>
                    <option value="Television">Television</option>
                    <option value="Radio">Radio</option>
                  </select>
                </th>
                <th>Description</th>
                <th>
                  Grouping: 
                  <select value={groupingFilter} onChange={handleGroupingFilterChange}>
                    <option value="All">All</option>
                    <option value="trending">Trending</option>
                    <option value="Featured">Featured</option>
                    <option value="Flash Sales">Flash Sales</option>
                  </select>
                </th>
                <th>Image URL</th>
                <th>Price</th>
                <th>Rating</th>
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