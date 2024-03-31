import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaClipboardList, FaShoppingCart, FaPercentage, FaDollarSign, FaGift } from 'react-icons/fa';
import './sidebar.css'; 
import logo from "../../Assets/banner.jpg";
import user from "../../Assets/user.jpg";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="sidebar">
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="sidebar-div">
        <div className='sidebar-hero'>
          <ul className="sidebar-menu">
            <li onClick={() => handleNavigate('/dashboard')}><FaHome /><span>Home</span></li>
            <li onClick={() => handleNavigate('/customers')}><FaUser /><span>Users</span></li>
            <li onClick={() => handleNavigate('/orders')}><FaClipboardList /><span>Orders</span></li>
            <li onClick={() => handleNavigate('/products')}><FaShoppingCart /><span>Products</span></li>
            <li onClick={() => handleNavigate('/gift&vouchers')}><FaGift t /><span>Gift Cards</span></li>
            <li onClick={() => handleNavigate('/discounts')}><FaPercentage /><span>Discounts</span></li>
            <li onClick={() => handleNavigate('/pricing')}><FaDollarSign/><span>Pricing</span></li>
            <li onClick={() => handleNavigate('/settings')}><FaCog /><span>Settings</span></li>
          </ul>
        </div>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <h5>Administrator</h5>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;