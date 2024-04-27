import React, { useState, useEffect } from 'react'
import Barchart from '../Barchart/barchart';
import Piechart from '../Piechart/piechart';
import Linegraph from '../Linegraph/linegraph';
import './home.css';
import { FaMoneyBillAlt, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa';
import user from "../../Assets/user.jpg";
<<<<<<< HEAD
import { FaBell } from 'react-icons/fa';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5555/products`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched products:', data); 
        setProducts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5555/orders`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched orders:', data); 
        setOrders(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='home-summary'>
      <div className="navbar-div">
        <h2>Dashboard</h2>
        <div className='sidebar-username'>
          <div className="notification-icon-container">
            <FaBell className="notification-icon" />
            <div className="notification-dot"></div>
          </div>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
            <h4>Admin</h4>
          </div>
=======

const Home = () => {
  const [loading, setLoading] = useState(true);



  return (
    <div>
      <div>
        <h2>Dashboard</h2>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <h4>Administrator</h4>
        </div>
      </div>
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
>>>>>>> 4a465f2bbb777fc8f713333db3a4c7c324818f04
        </div>
      </div>
      <div style={{display: 'flex', width: '100%'}}>
        <div className="dashboard-hero">
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
              {/* <Piechart /> */}
              <Barchart />
            </div>
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
              {orders.slice(0, 3).map(order => (
                <tr key={order.id}>
                  <td>order.product</td>
                  <td>{order.address}</td>
                  <td>{order.order_date}</td>
                  <td>order.user</td>
                  <td>${order.total_amount}</td>
                  <td>${order.shipping_fees}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        
      
    </div>
  )
}

export default Home;