import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaClipboardList, FaShoppingCart, FaSignOutAlt, FaDollarSign, FaFileInvoice, FaGift, FaHeadset, FaEnvelope } from 'react-icons/fa';
import './sidebar.css'; 
import logo from "../../Assets/banner.jpg";
import user from "../../Assets/user.jpg";


const Sidebar = ({ notifications }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const unreadCount = notifications.filter(notif => !notif.isRead).length;


  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleOpenTicket = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    setTicketTitle('');
    setTicketDescription('');
    document.body.style.overflow = 'auto';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Ticket submitted:', { title:ticketTitle, description: ticketDescription });
    handleClose(); 
  };


  const logoutToggleModal = () => {
    setIsLogoutModalOpen(true);
    document.body.style.overflow = 'hidden';
}

const handleLogout = () => {
    console.log("User logged out");
    setIsLogoutModalOpen(false);
    navigate('/signin');
}

const handleLogoutClose = () => {
  setIsLogoutModalOpen(false);
  document.body.style.overflow = 'auto';
};

// Close the modal when clicking outside of it
// window.onclick = const(event) => {
//     const modal = document.getElementById('logoutModal');
//     if (event.target === modal) {
//         toggleModal();
//     }
// };

  return (
    <div className="sidebar">
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="sidebar-div">
        <div className='sidebar-hero'>
          <ul className="sidebar-menu">
            <li onClick={() => handleNavigate('/')}><FaHome color='#ff6384'/><span>Dashboard</span></li>
            <li onClick={() => handleNavigate('/customers')}><FaUser color='#00aeee'/><span>Customers</span></li>
            <li onClick={() => handleNavigate('/orders')}><FaClipboardList color='green'/><span>Orders</span></li>
            <li onClick={() => handleNavigate('/messages')}><FaEnvelope color='gold'/><span>Messages {unreadCount > 0 ? unreadCount : "no"}</span></li>
            <li onClick={() => handleNavigate('/products')}><FaShoppingCart color='purple'/><span>Products</span></li>
            <li onClick={() => handleNavigate('/invoices')}><FaFileInvoice color='#4caf50'/><span>Invoices</span></li>
            <li onClick={() => handleNavigate('/gift&vouchers')}><FaGift color='red'/><span>Discounts</span></li>
            {/* <li onClick={() => handleNavigate('/discounts')}><FaDollarSign color='gold'/><span>Discounts</span></li> */}
            <li onClick={() => handleNavigate('/settings')}><FaCog color='#20c997'/><span>Settings</span></li>
          </ul>
        </div>
        <div className='sidebar-user'>
          <div className="support-ticket">
            <button onClick={handleOpenTicket} className="support-ticket-button">
              <FaHeadset className="support-ticket-icon" />
              Support Ticket
            </button>
            {isOpen && (
              <>
                <div className="supportTicket-overlay" onClick={handleClose}></div>
                <div className="supportTicket-modal">
                  <div className="supportTicket-modal-hero">
                    <h2>Submit a Support Ticket</h2>
                    <form onSubmit={handleSubmit}>
                      <div className='supportTicket-form'>
                        <label htmlFor="ticket-title">Title:</label>
                        <select
                          id="ticket-title"
                          value={ticketTitle}
                          onChange={(e) => setTicketTitle(e.target.value)}
                          required
                        >
                          <option value="" disabled>Select a title</option>
                          <option value="Technical Issue">Technical Issue</option>
                          <option value="Billing Inquiry">Billing Inquiry</option>
                          <option value="Feature Request">Feature Request</option>
                          <option value="Account Problem">Account Problem</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className='supportTicket-form'>
                        <label htmlFor="ticket-description">Description:</label>
                        <textarea
                          id="ticket-description"
                          rows="5"
                          value={ticketDescription}
                          onChange={(e) => setTicketDescription(e.target.value)}
                          placeholder="Please provide a detailed explanation of your issue."
                          required
                        />
                      </div>
                      
                      <div className="supportTicket-modal-buttons">
                        <button type="button" onClick={handleClose} className="supportTicket-cancelButton">
                          Cancel
                        </button>
                        <button type="submit" className="supportTicket-submitButton">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                </>
            )}
          </div>

          {isLogoutModalOpen && (
            <div id="logoutModal" className="logout-modal">
                  <div className="logout-modal-content">
                    <span className="logout-close" onClick={handleLogoutClose}>&times;</span>
                    <h2>Confirm Logout</h2>
                    <p>Are you sure you want to log out?</p>
                    <button className="confirmLogout" onClick={handleLogout}>Yes</button>
                    <button className="cancelLogout" onClick={handleLogoutClose}>No</button>
                  </div>
                </div>

          )}

          <div onClick={logoutToggleModal} className='sidebar-user-div'>
            <img src={user} alt='profile-icon' />
            <div className='sidebar-user-account'>
              <div className='user-profile-details'>
                <h5>Administrator</h5>
                <h5>admin@admin</h5>
              </div>
              <div>
                <FaSignOutAlt color='#ff9f40' fontSize='22' marginRight='90px'/>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;