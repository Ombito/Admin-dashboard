import './App.css';
import Sidebar from '../src/components/Sidebar/sidebar';
import Home from '../src/components/Home/home';
import Products from '../src/components/Products/products';
import Orders from '../src/components/Orders/orders';
import Users from '../src/components/Users/users';
import Settings from '../src/components/Settings/settings';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <div className="content">
        <Routes>
          <Route>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
