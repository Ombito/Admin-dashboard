import React, { useState, useEffect, useRef } from 'react'
import Barchart from '../Barchart/barchart';
import Piechart from '../Piechart/piechart';
import Linegraph from '../Linegraph/linegraph';
import './home.css';
import { FaMoneyBillAlt, FaShoppingCart, FaDollarSign, FaUsers, FaHome, FaFileExport, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import user from "../../Assets/user.jpg";
import { FaBell } from 'react-icons/fa';
import data from '../data.json';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dashboardStats, setDashboardStats] = useState([]);
  const contentRef = useRef();

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


const handleExportPDF = () => {
  const input = contentRef.current; 

  if (input) {
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); 
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; 

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); 
      pdf.save('download.pdf');
    })
    .catch((err) => console.error('Error generating PDF', err));
  }
    else {
      console.error('Invalid element provided for capture');
    }
};

  const DashboardStatItem = ({ icon, color, label, value, percentage }) => {
    const isIncrease = percentage >= 0;

    return (
  <div className="dashboard-stat">
    <div className="dashboard-analytics">
      {icon === 'FaMoneyBillAlt' && <FaMoneyBillAlt color={color} className="dashboard-icon" />}
      {icon === 'FaShoppingCart' && <FaShoppingCart color={color} className="dashboard-icon" />}
      {icon === 'FaDollarSign' && <FaDollarSign color={color} className="dashboard-icon" />}
      {icon === 'FaUsers' && <FaUsers color={color} className="dashboard-icon" />}
      <h3 style={{ color }}>{value}</h3>
    </div>
    <div className='statRatio-div'>
      <p>{label}</p>
      <div className={`statRatio-divs ${isIncrease ? 'increase' : 'decrease'}`}>
        {isIncrease ? (
          <FaArrowUp className="stat-icon" style={{ color: 'green' }}/>
        ) : (
          <FaArrowDown className="stat-icon" style={{ color: 'red' }}/>
        )}
        <p>{percentage}%</p>
      </div>
    </div>
  </div>
    )
};


  return (
    <div className='home-summary'>
      <div className="navbar-div">
        <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
          <FaHome color='#ff6384' fontSize={25}/><h2>Dashboard</h2>
        </div>
        <div onClick={handleExportPDF} className="export-button">
          <FaFileExport className="export-icon" />
          <span>Export Data</span>
        </div>
      </div>
      <div ref={contentRef} className="dashboard-home-landing">
        <div className="dashboard-hero">
          <div className="dashboard-stats-container">
            {dashboardStats.map((stat) => (
              <DashboardStatItem
                key={stat.id}
                icon={stat.icon}
                color={stat.color}
                value={stat.value}
                label={stat.label}
                percentage={stat.percentage}
              />
            ))}
            </div>
          <div className="dashboard">
            <div className="chart-container">
              <Linegraph />
              {/* <Piechart /> */}
              <Barchart />
            </div>
          </div>
          <div className="recent-orders-container">
            <h3>Recent Orders</h3>
            <table className="dashboard-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Address</th>
                  <th>Order Date</th>
                  <th>Price</th>
                  <th>Product</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.address}</td>
                  <td>{order.order_date}</td>
                  <td>${order.total_amount}</td>
                  <td>{order.product}</td>
                  <td>{order.status}</td>
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