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
import Invoices from '../src/components/Invoices/invoices';
import Settings from '../src/components/Settings/settings';
import SignIn from '../src/components/Signin/signin';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

function App() {
  const [user, setUser] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  
  return (
    <div className='app'>
      {user ? (
        <div className='home-app'>
          <div className='dashboard-landing'>
          {location.pathname !== '/signin' && <Sidebar />}
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/messages" element={<Messages />} />
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
