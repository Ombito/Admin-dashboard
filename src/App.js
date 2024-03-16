import './App.css';
import Sidebar from '../src/components/Sidebar/sidebar';
import Home from '../src/components/Home/home';
import Products from '../src/components/Products/products';
import Orders from '../src/components/Orders/orders';
import Users from '../src/components/Users/users';
import Settings from '../src/components/Settings/settings';

function App() {
  return (
    <div>
      <Sidebar />
      <Home />
      <Products />
      <Orders />
      <Users />
      <Settings />
    </div>
  );
}

export default App;
