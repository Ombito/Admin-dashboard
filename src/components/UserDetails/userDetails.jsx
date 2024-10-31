import React from 'react';
import { useLocation } from 'react-router-dom';
import './userDetails.css';
import userIcon from "../../Assets/user.jpg";

const UserDetails = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div className="userDetails-container">
      <div className="navbar-div">
        <div className="navbar-div-hero-section">
          <h2>User Details</h2>
        </div>
        <div className='sidebar-username'>
          <div className="admin-profile">
            <img src={userIcon} alt="avatar" />
          </div>
        </div>
      </div>
      {user ? (
        <div className='userDetails-summary'>
          <div className="user-details-card">
            <div className="user-header">
              <img className="user-icon" src={userIcon} alt="avatar" />
              <h3>{user.first_name} {user.last_name}</h3>
              <div className="status-active-div">
                <div className="status-dot active"></div>
                <p className="status-text">Active</p>
              </div>
              <p className="role">Role: <span>User</span></p>
              
            </div>
            <div className="user-info">
              <p>{user.email}</p>
              <p>{user.phone_number}</p>
            </div>
          </div>
          <p>No previous orders.</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDetails;