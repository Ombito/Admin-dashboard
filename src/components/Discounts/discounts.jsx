import React from 'react';
import './discounts.css';
import user from "../../Assets/user.jpg";
<<<<<<< HEAD
import { FaBell } from 'react-icons/fa';
=======
>>>>>>> 4a465f2bbb777fc8f713333db3a4c7c324818f04

const Discounts = () => {
  const discounts = [
    {
      id: 1,
      name: 'Spring Sale',
      discountPercentage: 20,
      isActive: true
    },
    {
      id: 2,
      name: 'Summer Clearance',
      discountPercentage: 30,
      isActive: false
    },
  ];

  const removeDiscount = (id) => {
    console.log(`Remove discount with ID: ${id}`);
  };

  return (
    <div className="discounts-container">
<<<<<<< HEAD
      <div className="navbar-div">
        <h2>Discounts</h2>
        <div className='sidebar-username'>
          <div className="notification-icon-container">
            <FaBell className="notification-icon" />
            <div className="notification-dot"></div>
          </div>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
            <h4>Admin</h4>
          </div>
=======
      <div>
        <h2>Discounts</h2>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <h4>Administrator</h4>
>>>>>>> 4a465f2bbb777fc8f713333db3a4c7c324818f04
        </div>
      </div>
      <div className="discounts-list">
        {discounts.map(discount => (
          <div key={discount.id} className="discount-item">
            <div className="discount-info">
              <h3>{discount.name}</h3>
              <p>Discount: {discount.discountPercentage}%</p>
              <p>Status: {discount.isActive ? 'Active' : 'Inactive'}</p>
            </div>
            <button onClick={() => removeDiscount(discount.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button className="add-discount-button">Add Discount</button>
    </div>
  );
};

export default Discounts;
