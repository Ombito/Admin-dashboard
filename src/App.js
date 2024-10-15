import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from '../src/components/Sidebar/sidebar';
import Home from '../src/components/Home/home';
import Products from '../src/components/Products/products';
import Orders from '../src/components/Orders/orders';
import Users from '../src/components/Users/users';
import Discounts from '../src/components/Discounts/discounts';
import Giftcard from '../src/components/Giftcard/giftcard';
import Settings from '../src/components/Settings/settings';
import SignIn from '../src/components/Signin/signin';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(true);
  
  return (
    <div className='app'>
      {user ? (
        <div className='home-app'>
          <div className='dashboard-landing'>
            <Sidebar />
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Users />} />
              <Route path="/discounts" element={<Discounts />} />
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
