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
        <div className="userDetails-hero-container">
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDetails;