import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaClipboardList, FaShoppingCart, FaSignOutAlt, FaDollarSign, FaGift, FaHeadset } from 'react-icons/fa';
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
            <li onClick={() => handleNavigate('/')}><FaHome color='#ff6384'/><span>Dashboard</span></li>
            <li onClick={() => handleNavigate('/customers')}><FaUser color='#00aeee'/><span>Users</span></li>
            <li onClick={() => handleNavigate('/orders')}><FaClipboardList color='green'/><span>Orders</span></li>
            <li onClick={() => handleNavigate('/products')}><FaShoppingCart color='purple'/><span>Products</span></li>
            <li onClick={() => handleNavigate('/gift&vouchers')}><FaGift color='red'/><span>Gift Cards</span></li>
            <li onClick={() => handleNavigate('/discounts')}><FaDollarSign color='gold'/><span>Discounts</span></li>
            <li onClick={() => handleNavigate('/settings')}><FaCog color='#20c997'/><span>Settings</span></li>
          </ul>
        </div>
        <div className='sidebar-user'>
          <div className="support-ticket">
            {/* <button><FaHeadset color='#393564'/> Support Ticket</button> */}
            <button className="support-ticket-button">
              <FaHeadset className="support-ticket-icon" />
              Support Ticket
            </button>
          </div>
          <div className='sidebar-user-div'>
            <img src={user} alt='profile-icon' />
            <div className='sidebar-user-account'>
              <div className='user-profile-details'>
                <h5>Admin</h5>
                <h5>admin@admin</h5>
              </div>
              <div>
                <FaSignOutAlt color='#ff9f40' fontSize='22' marginRight='90px'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;