import React from 'react';
import './giftcard.css';
import user from "../../Assets/user.jpg";
import { FaBell } from 'react-icons/fa';

const Giftcards = () => {
  return (
    <div className="giftcards-container">
      <div className="navbar-div">
        <h2>Giftcards & Vouchers</h2>
        <div className='sidebar-username'>
          <div className="notification-icon-container">
            <FaBell className="notification-icon" />
            <div className="notification-dot"></div>
          </div>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
            <h4>Admin</h4>
          </div>
        </div>
      </div>
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
  )
}

export default Giftcards;
