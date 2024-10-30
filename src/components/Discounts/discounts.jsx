import React, { useState } from 'react';
import './discounts.css';
import user from "../../Assets/user.jpg";
import { FaSearch } from 'react-icons/fa';

const Discounts = () => {
  const [createDiscountModal, setCreateDiscountModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const discountToggleModal = () => {
    setCreateDiscountModal(true);
    document.body.style.overflow = 'auto';
}
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount({ ...newDiscount, [name]: value });
  };

  const addDiscount = (e) => {
    e.preventDefault(); 
    if (newDiscount.name && newDiscount.discountPercentage) {
      const newDiscountEntry = {
        id: discounts.length + 1, 
        name: newDiscount.name,
        discountPercentage: parseFloat(newDiscount.discountPercentage),
        code: newDiscount.code,
        isActive: true 
      };
      setDiscounts([...discounts, newDiscountEntry]);
      setNewDiscount({ name: '', discountPercentage: '' }); 
      setCreateDiscountModal(false);
    } else {
      alert("Please fill in all fields.");
    }
  };
  
  const removeDiscount = (id) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
    console.log(`Remove discount with ID: ${id}`);
  };
  
  const handleDiscountClose = () => {
    setCreateDiscountModal(false);
    document.body.style.overflow = 'auto';
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
};


const filteredDiscounts = discounts.filter(discount =>
  discount.name.toLowerCase().includes(searchQuery.toLowerCase())
  // discount.code.toLowerCase().includes(searchQuery.toLowerCase())
);


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
              <button className="remove-discount-btn" onClick={() => removeDiscount(discount.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="discounts-container">
          <div className="invoices-controls-hero">
            <h2>All Discounts</h2>
            <div className="invoices-controls">
              <button onClick={discountToggleModal} className="add-invoice-button">Add Discount</button>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type='text' className="search-input" placeholder='Search discounts...' value={searchQuery} onChange={handleSearchChange}/>
              </div>
            </div>
          </div>
        <div className="discounts-content">
          {createDiscountModal && (
            <div className='discount-modal'>
              <div className='discount-modal-content'>
                <form className="discount-form" onSubmit={addDiscount}>
                  <span className="close" onClick={handleDiscountClose}>&times;</span>
                  <label htmlFor="discount-code">Giftcard Code</label>
                  <input type="text" id="discount-code" name="code"value={newDiscount.code} onChange={handleInputChange} required />
                  <label htmlFor="discount-name">Giftcard Name</label>
                  <input 
                    type="text" 
                    id="discount-name" 
                    name="name" 
                    value={newDiscount.name}
                    onChange={handleInputChange} 
                    required 
                  />
                  <label htmlFor="discount-value">Value</label>
                  <input type="number" id="discount-value" name="discountPercentage" value={newDiscount.discountPercentage} onChange={handleInputChange} required/>
                  <button className="discount-button" type="submit">Add Discount</button>
                </form>
              </div>
            </div>
          )}

            <table className="giftcard-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDiscounts.map((discount) => (
                  <tr key={discount.id}>
                    <td>{discount.code}</td>
                    <td>{discount.name}</td>
                    <td>{discount.discountPercentage}%</td>
                    <td>{discount.isActive ? 'Active' : 'Inactive'}</td>
                    <td>
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
