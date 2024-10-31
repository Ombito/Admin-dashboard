import React, { useState, useEffect } from 'react';
import './users.css';
import { useAlert } from '../../context/alertContext';
import user from "../../Assets/user.jpg";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import data from '../data.json';


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
  const { showAlert } = useAlert();
  const handleNavigation = (route) => {
    navigate(route);
  };
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [createUsersModal, setCreateUsersModal] = useState(false);

  useEffect(() => {
    // const apiUrl = `http://127.0.0.1:5555/users`;
    // fetch(apiUrl)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`Network response was not ok: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('Fetched users:', data); 
    //     setUsers(data);
    //     setLoading(false);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     setLoading(false);
    //   });
    setUsers(data.users);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  const handleUserClick = (userDetails) => {
    navigate('/user-details', { state: { user: userDetails } });
  };


   const handleRemoveUser = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this user?');
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      showAlert('success', 'User removed successfully.');
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId); 
      } else {
        return [...prevSelected, userId]; 
      }
    });
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allUserIds = users.map(user => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const usersToggleModal = () => {
    setCreateUsersModal(true);
    document.body.style.overflow = 'auto';
}


  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="navbar-div">
        <div className="navbar-div-hero-section">
          <h2>Users</h2>
        </div>
        <div className='sidebar-username'>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
          </div>
        </div>
      </div>
      
      <div className="users-hero-container">
        <div className="button-container">
            {showModal && (
              <div className="user-modal">
                <div className="user-modal-content">
                  <span className="close" onClick={handleCloseModal}>&times;</span>
                  <form onSubmit={handleSubmit} className="add-user-form">
                    <div className="name-div">
                      <input type="text" className="input" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      <input type="text" className="input" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <input type="email" className="input" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="phone" className="input" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Add User</button>
                  </form>
                  </div>
            </div>
          )}
        </div>

        <div className="invoices-controls-hero">
          <h2>All Users</h2>
          <div className="invoices-controls">
            <button onClick={handleOpenModal} className="add-invoice-button">Add User</button>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type='text' className="search-input" placeholder='Search users...' value={searchQuery} onChange={handleSearchChange}/>
            </div>
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(filteredUser => (
              <tr key={filteredUser.id} onClick={() => handleUserClick(filteredUser)}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(filteredUser.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(filteredUser.id);
                    }}
                  />
                </td>
                <td>{filteredUser.first_name} {filteredUser.last_name}</td>
                <td>{filteredUser.email}</td>
                <td>{filteredUser.phone_number}</td>
                <td>User</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
