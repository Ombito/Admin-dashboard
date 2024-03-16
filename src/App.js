import './App.css';
import Sidebar from '../src/components/Sidebar/sidebar';
import Home from '../src/components/Home/home';
import Products from '../src/components/Products/products';
import Orders from '../src/components/Orders/orders';
import Users from '../src/components/Users/users';


function App() {
  return (
    <div>
      <Sidebar />
      <Home />
      <Products />
      <Orders />
      <Users />
    </div>
  );
}

export default App;
