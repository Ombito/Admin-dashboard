import React, { useState } from 'react'
import './signin.css';
import { useNavigate } from 'react-router-dom';
import logo1 from "../../Assets/logo3.png";


const Signin = ( {user, setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in', email);

    try {
      const response = await fetch('http://127.0.0.1:5555/login_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data)
        navigate('/');
      } else {
        console.log("Login failed!")
      }
    } catch (error) {
      console.error('Login failed: ', error);
    }
  };

  return (
      <div className='signin-container-hero'>
        <div className='signin-container'>
          <div className="brand-logo-container">
            {/* <img className="brand-logo" src={logo1} alt="logo" /> */}
            <h1>Flap</h1>
          </div>
          <h2>Welcome back!🤓</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="signin-btn" type="submit">Login</button>
          </form>
        </div>
      </div>
  )
}

export default Signin;