import React, { useState, useEffect } from 'react';
import './users.css';
import user from "../../Assets/user.jpg";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5555/users`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched users:', data); 
        setUsers(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: '', email: '', role: 'User' });
    }
  };

   const handleRemoveUser = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="users-container">
      <div className="navbar-div">
        <h2>User Management</h2>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <h4>Admin</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="add-user-form">
        <input type="text" name="name" value={newUser.name} placeholder="Name" onChange={handleInputChange} />
        <input type="email" name="email" value={newUser.email} placeholder="Email" onChange={handleInputChange} />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>Customer</td>
              <td>
                <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
