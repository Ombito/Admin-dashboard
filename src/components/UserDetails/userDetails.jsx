import React from 'react';
import { useLocation } from 'react-router-dom';
import './userDetails.css';
import user from "../../Assets/user.jpg";

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
                    <img src={user} alt="avatar" />
                </div>
            </div>
        </div>
      {user ? (
        <div className="user-details-card">
          <div className="user-header">
            <h3>{user.first_name} {user.last_name}</h3>
            <p className="role">Role: <span>User</span></p>
          </div>
          <div className="user-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phone_number}</p>
            <p><strong>Date of Birth:</strong> {user.date_of_birth || 'N/A'}</p>
            <p><strong>Address:</strong> {user.address || 'N/A'}</p>
            <p><strong>City:</strong> {user.city || 'N/A'}</p>
            <p><strong>State:</strong> {user.state || 'N/A'}</p>
            <p><strong>Zip Code:</strong> {user.zip_code || 'N/A'}</p>
            <p><strong>Country:</strong> {user.country || 'N/A'}</p>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDetails;