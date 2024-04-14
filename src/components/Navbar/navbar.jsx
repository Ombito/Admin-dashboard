import React from 'react';
import './navbar.css';
import user from "../../Assets/user.jpg";

const Navbar = () => {
  return (
    <div>
        <div className='sidebar-username'>
            <img src={user} alt="avatar" />
            <h4>Administrator</h4>
        </div>
    </div>
  )
}

export default Navbar;