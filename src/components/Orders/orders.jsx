import React, { useState } from 'react';
import './orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: 'Product A',
      address: 'Nairobi, Kenya',
      orderDate: '2024-02-20',
      user: 'User 1',
      totalAmount: 150,
      shippingFees: 10,
      status: 'In Progress'
    },
    {
      id: 2,
      product: 'Product B',
      address: 'Kisumu, Kenya',
      orderDate: '2024-02-21',
      user: 'User 2',
      totalAmount: 200,
      shippingFees: 15,
      status: 'On Transit'
    },
  ]);

  
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
              <td>{order.product}</td>
              <td>{order.address}</td>
              <td>{order.orderDate}</td>
              <td>{order.user}</td>
              <td>${order.totalAmount}</td>
              <td>${order.shippingFees}</td>
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
