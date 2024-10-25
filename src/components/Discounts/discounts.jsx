import React from 'react';
import './discounts.css';
import user from "../../Assets/user.jpg";


const Discounts = () => {
  const discounts = [
    {
      id: 1,
      name: 'Christmas & New Year Sale',
      discountPercentage: 20,
      isActive: true
    },
    {
      id: 2,
      name: 'Easter Clearance',
      discountPercentage: 30,
      isActive: false
    },
  ];

  const removeDiscount = (id) => {
    console.log(`Remove discount with ID: ${id}`);
  };

  return (
    <div className="discounts-container">
      <div className="navbar-div">
        <div className="navbar-div-hero-section">
          <h2>Discounts</h2>
        </div>
        <div className='sidebar-username'>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
          </div>
        </div>
      </div>
      <div className='discounts-hero-container'>
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
        <div className="giftcards-container">
          <div className="giftcards-content">
            <form className="giftcard-form">
              <label htmlFor="giftcard-code">Giftcard Code:</label>
              <input type="text" id="giftcard-code" name="giftcard-code" />
              <label htmlFor="giftcard-value">Value:</label>
              <input type="number" id="giftcard-value" name="giftcard-value" />
              <button type="submit">Add Giftcard</button>
            </form>

            <table className="giftcard-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>GC123456</td>
                  <td>$50</td>
                  <td>Active</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
