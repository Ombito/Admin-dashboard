// UserDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div>
      <h2>User Details</h2>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
          {/* Add more fields as needed */}
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserDetails;