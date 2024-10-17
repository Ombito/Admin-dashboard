import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from '../src/components/Sidebar/sidebar';
import Home from '../src/components/Home/home';
import Products from '../src/components/Products/products';
import Orders from '../src/components/Orders/orders';
import Users from '../src/components/Users/users';
import Discounts from '../src/components/Discounts/discounts';
import Giftcard from '../src/components/Giftcard/giftcard';
import Messages from '../src/components/Messages/messages';
import MessageDetails from '../src/components/MessageDetails/messageDetails';
import Invoices from '../src/components/Invoices/invoices';
import Settings from '../src/components/Settings/settings';
import SignIn from '../src/components/Signin/signin';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 


function App() {
  const [user, setUser] = useState(true);
  const location = useLocation();

  const [notifications, setNotifications] = useState([
    { id: 1, sender: 'System', content: 'Your profile has been updated.', timestamp: '2024-10-17 10:30 AM', isRead: false },
    { id: 2, sender: 'Admin', content: 'New features have been added to your account.', timestamp: '2024-10-16 3:45 PM', isRead: false },
    { id: 3, sender: 'Support', content: 'Your support ticket has been resolved.', timestamp: '2024-10-15 12:00 PM', isRead: true },
    { id: 4, sender: 'System', content: 'Scheduled maintenance will occur tonight.', timestamp: '2024-10-14 9:00 AM', isRead: true },
]);

useEffect(() => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
}, [notifications]);

const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
    ));
};
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  
  return (
    <div className='app'>
      {user ? (
        <div className='home-app'>
          <div className='dashboard-landing'>
          {location.pathname !== '/signin' && <Sidebar notifications={notifications}/>}
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/messages" element={<Messages notifications={notifications} markAsRead={markAsRead}/>} />
              <Route path="/messages/:id" element={<MessageDetails notifications={notifications} />} />
              <Route path="/customers" element={<Users />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/gift&vouchers" element={<Giftcard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signin" element={<SignIn setUser={setUser}/>} />
            </Routes>
          </div>
        </div>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </div>
  )
}

export default App;
