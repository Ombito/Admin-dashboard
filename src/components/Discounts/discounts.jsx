import React, { useState } from 'react';
import './discounts.css';
import user from "../../Assets/user.jpg";


const Discounts = () => {
  const [discounts, setDiscounts] = useState([
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
  ]);

  const [newDiscount, setNewDiscount] = useState({
    name: '',
    discountPercentage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount({ ...newDiscount, [name]: value });
  };

  const addDiscount = (e) => {
    e.preventDefault(); // Prevent form submission
    if (newDiscount.name && newDiscount.discountPercentage) {
      const newDiscountEntry = {
        id: discounts.length + 1, // Simple ID assignment
        name: newDiscount.name,
        discountPercentage: parseFloat(newDiscount.discountPercentage),
        isActive: true // Default to active
      };
      setDiscounts([...discounts, newDiscountEntry]);
      setNewDiscount({ name: '', discountPercentage: '' }); // Reset form fields
    } else {
      alert("Please fill in all fields.");
    }
  };
  
  const removeDiscount = (id) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
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
        <div className="discounts-container">
          <div className="discounts-content">
            <form className="discount-form">
              <label htmlFor="discount-code">Giftcard Code:</label>
              <input type="text" id="discount-code" name="code"value={newDiscount.code} onChange={handleInputChange} required />
              <label htmlFor="discount-name">Giftcard Name:</label>
              <input 
                type="text" 
                id="discount-name" 
                name="name" 
                value={newDiscount.name}
                onChange={handleInputChange} 
                required 
              />
              <label htmlFor="discount-value">Value:</label>
              <input type="number" id="discount-value" name="discount-value" value={newDiscount.discountPercentage} onChange={handleInputChange} required/>
              <button type="submit">Add Discount</button>
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
                {discounts.map((discount) => (
                  <tr key={discount.id}>
                    <td>{discount.code}</td>
                    <td>{discount.name}</td>
                    <td>{discount.discountPercentage}%</td>
                    <td>{discount.isActive ? 'Active' : 'Inactive'}</td>
                    <td>
                      <button>Edit</button>
                      <button onClick={() => removeDiscount(discount.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
