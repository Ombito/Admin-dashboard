import React from 'react';
import './invoices.css';
import user from "../../Assets/user.jpg";


const Invoices = () => {
  return (
    <div className='invoice-hero-container'>
      <div className="navbar-div">
        <h2>Invoices</h2>
        <div className='sidebar-username'>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
          </div>
        </div>
      </div>
        <div className='invoice-hero'></div>
    </div>
  )
}

export default Invoices;