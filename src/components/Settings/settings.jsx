import React, { useState } from 'react';
import './settings.css';
import user from "../../Assets/user.jpg";
<<<<<<< HEAD
import { FaBell } from 'react-icons/fa';
=======
>>>>>>> 4a465f2bbb777fc8f713333db3a4c7c324818f04

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'english',
  });


  const handleThemeChange = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings({ ...settings, theme: newTheme });
  };

  const handleNotificationsToggle = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSettings({ ...settings, language: newLanguage });
  };

  return (
    <div className={`settings-container ${settings.theme === 'dark' ? 'dark-theme' : ''}`}>
<<<<<<< HEAD
      <div className="navbar-div">
        <h2>Settings</h2>
        <div className='sidebar-username'>
          <div className="notification-icon-container">
            <FaBell className="notification-icon" />
            <div className="notification-dot"></div>
          </div>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
            <h4>Admin</h4>
          </div>
=======
      <div>
        <h2>Settings</h2>
        <div className='sidebar-username'>
          <img src={user} alt="avatar" />
          <h4>Administrator</h4>
>>>>>>> 4a465f2bbb777fc8f713333db3a4c7c324818f04
        </div>
      </div>
      <div className="setting-option">
        <label>Theme:</label>
        <button onClick={handleThemeChange}>{settings.theme === 'light' ? 'Dark' : 'Light'}</button>
      </div>
      <div className="setting-option">
        <label>Notifications:</label>
        <input
          type="checkbox"
          checked={settings.notifications}
          onChange={handleNotificationsToggle}
        />
      </div>
      <div className="setting-option">
        <label>Language:</label>
        <select value={settings.language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
