import React from 'react';
import { FaHome, FaUser, FaCog, FaClipboardList, FaShoppingCart, FaTimes } from 'react-icons/fa';
import './sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="close-icon">
        <FaTimes />
      </div>
      <ul className="sidebar-menu">
        <li><FaHome /><span>Home</span></li>
        <li><FaUser /><span>Manage Team</span></li>
        <li><FaClipboardList /><span>Orders</span></li>
        <li><FaShoppingCart /><span>Products</span></li>
        <li><FaCog /><span>Settings</span></li>
      </ul>
    </div>
  );
};

export default Sidebar;