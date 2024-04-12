import React, { useState, useEffect } from 'react';
import './orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5555/orders`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched orders:', data); 
        setOrders(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  
  const handleStatusChange = (orderId, newStatus) => { 
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Address</th>
            <th>Order Date</th>
            <th>User</th>
            <th>Total Amount</th>
            <th>Shipping Fees</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>order.product</td>
              <td>{order.address}</td>
              <td>{order.order_date}</td>
              <td>order.user</td>
              <td>${order.total_amount}</td>
              <td>${order.shipping_fees}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'Delivered' ? (
                  <button className="delivered-button">Delivered</button>
                ) : (
                  <select onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                    <option value="In Progress">In Progress</option>
                    <option value="On Transit">On Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
