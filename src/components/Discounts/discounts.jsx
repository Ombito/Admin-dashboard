import React from 'react';
import './discounts.css';
import user from "../../Assets/user.jpg";

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
      <div>
        <h2>Discounts</h2>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <h4>Administrator</h4>
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
