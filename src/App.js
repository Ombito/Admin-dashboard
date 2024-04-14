import './App.css';
import Sidebar from '../src/components/Sidebar/sidebar';
import Home from '../src/components/Home/home';
import Products from '../src/components/Products/products';
import Orders from '../src/components/Orders/orders';
import Users from '../src/components/Users/users';
import Discounts from '../src/components/Discounts/discounts';
import Giftcard from '../src/components/Giftcard/giftcard';
import Settings from '../src/components/Settings/settings';
import Navbar from '../src/components/Navbar/navbar';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

function App() {
  
  return (
    <div className='app'>
      <Sidebar />
      <div className="content">
        <Navbar />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Users />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/gift&vouchers" element={<Giftcard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
