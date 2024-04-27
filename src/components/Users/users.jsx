import React, { useState, useEffect } from 'react';
import './users.css';
import user from "../../Assets/user.jpg";
import { FaBell, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleNavigation = (route) => {
    navigate(route);
  };

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:5555/signup_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, phone_number: phoneNumber, password }),
      });
  
      if (response.ok) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        handleCloseModal()
        console.log('Signup successful')
      } else {
        console.log("Signup failed!")
      }
    } catch (error) {
      setError('Error: ' + error.message);
      console.error('Error during signup:', error);
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
          <div className="notification-icon-container">
            <FaBell className="notification-icon" />
            <div className="notification-dot"></div>
          </div>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
            <h4>Admin</h4>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleOpenModal}>Add User</button>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <form onSubmit={handleSubmit} className="add-user-form">
                  <div className="name-div">
                    <input type="text" className="input" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" className="input" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input type="phone" className="input" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="submit">Add User</button>
                </form>
                </div>
          </div>
        )}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> 
        </div>
      </div>

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
        {users
            .filter(user => {
              return user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     user.email.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .map(filteredUser => (
              <tr key={filteredUser.id}>
                <td>{filteredUser.first_name} {filteredUser.last_name}</td>
                <td>{filteredUser.email}</td>
                <td>Customer</td>
                <td>
                  <button onClick={() => handleRemoveUser(filteredUser.id)}>Remove</button>
                </td>
              </tr>
            ))}
          {/* {users.map(user => (
            <tr key={user.id}>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>Customer</td>
              <td>
                <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
