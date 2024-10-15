import React, { useState, useEffect } from 'react'
import Barchart from '../Barchart/barchart';
import Piechart from '../Piechart/piechart';
import Linegraph from '../Linegraph/linegraph';
import './home.css';
import { FaMoneyBillAlt, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa';
import user from "../../Assets/user.jpg";
import { FaBell } from 'react-icons/fa';
import data from '../data.json';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState([]);

  useEffect(() => {
    // const fetchDashboardStats = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:5555/dashboard-stats');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch dashboard statistics');
    //         }
    //         const data = await response.json();
    //         setDashboardStats(data);
    //     } catch (error) {
    //         console.error('Error fetching dashboard statistics:', error);
    //     }
    // };

    // fetchDashboardStats();

    setDashboardStats(data.dashboardStats);
    setLoading(false);
}, []);

  useEffect(() => {
    // const apiUrl = `http://127.0.0.1:5555/products`;
    // fetch(apiUrl)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`Network response was not ok: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('Fetched products:', data); 
    //     setProducts(data);
    //     setLoading(false);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     setLoading(false);
    //   });

    setProducts(data.products);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    // const apiUrl = `http://127.0.0.1:5555/orders`;
    // fetch(apiUrl)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`Network response was not ok: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('Fetched orders:', data); 
    //     setOrders(data);
    //     setLoading(false);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     setLoading(false);
    //   });

    setOrders(data.orders);
    setLoading(false);
  }, []);


  const DashboardStatItem = ({ icon, color, label, value }) => (
  <div className="dashboard-stat">
    <div>
      {icon === 'FaMoneyBillAlt' && <FaMoneyBillAlt color={color} className="dashboard-icon" />}
      {icon === 'FaShoppingCart' && <FaShoppingCart color={color} className="dashboard-icon" />}
      {icon === 'FaDollarSign' && <FaDollarSign color={color} className="dashboard-icon" />}
      {icon === 'FaUsers' && <FaUsers color={color} className="dashboard-icon" />}
      <p>{label}</p>
      <h3 style={{ color }}>{value}</h3>
    </div>
  </div>
);


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
        </div>
      </div>
      <div style={{display: 'flex', width: '100%'}}>
        <div className="dashboard-hero">
          <div className="dashboard-stats-container">
            {dashboardStats.map((stat) => (
              <DashboardStatItem
                key={stat.id}
                icon={stat.icon}
                color={stat.color}
                label={stat.label}
                value={stat.value}
              />
            ))}
            </div>
          <div className="dashboard">
            <div className="chart-container">
              <Linegraph />
              <Piechart />
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