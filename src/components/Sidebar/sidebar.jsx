import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaClipboardList, FaShoppingCart, FaBars } from 'react-icons/fa';
import './sidebar.css'; 
import logo from "../../Assets/banner.jpg";
import user from "../../Assets/banner.jpg";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="sidebar">
      <img className="logo" src={logo} alt="logo" />
      <div className='sidebar-hero'>
        <ul className="sidebar-menu">
          <li onClick={() => handleNavigate('/dashboard')}><FaHome /><span>Home</span></li>
          <li onClick={() => handleNavigate('/customers')}><FaUser /><span>Customers</span></li>
          <li onClick={() => handleNavigate('/orders')}><FaClipboardList /><span>Orders</span></li>
          <li onClick={() => handleNavigate('/products')}><FaShoppingCart /><span>Products</span></li>
          <li onClick={() => handleNavigate('/gift&vouchers')}><FaShoppingCart /><span>Gift Cards</span></li>
          <li onClick={() => handleNavigate('/discounts')}><FaShoppingCart /><span>Discounts</span></li>
          <li onClick={() => handleNavigate('/pricing')}><FaShoppingCart /><span>Pricing</span></li>
          <li onClick={() => handleNavigate('/settings')}><FaCog /><span>Settings</span></li>
        </ul>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <div>
            <h5>Alvin</h5>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;