import React, { useState } from 'react';
import './settings.css';
import user from "../../Assets/user.jpg";
import { FaBell } from 'react-icons/fa';


// const Settings = () => {
//   const [settings, setSettings] = useState({
//     theme: 'light',
//     notifications: true,
//     language: 'english',
//   });

//   const handleThemeChange = () => {
//     const newTheme = settings.theme === 'light' ? 'dark' : 'light';
//     setSettings({ ...settings, theme: newTheme });
//   };

//   const handleNotificationsToggle = () => {
//     setSettings({ ...settings, notifications: !settings.notifications });
//   };

//   const handleLanguageChange = (e) => {
//     const newLanguage = e.target.value;
//     setSettings({ ...settings, language: newLanguage });
//   };


const Settings = ({ theme, toggleTheme, settingsNotifications, setSettingsNotifications, language, setLanguage }) => {
  const handleNotificationsToggle = () => {
    setSettingsNotifications(prev => !prev);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  
  return (
    <div className={`settings-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="navbar-div">
        <div className="navbar-div-hero-section">
          <h2>Settings</h2>
        </div>
        <div className='sidebar-username'>
          <div className="admin-profile">
            <img src={user} alt="avatar" />
          </div>
        </div>
      </div>
      <div className="settings-hero-container">
        <div className="setting-option">
          <label>Theme:</label>
          <button onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</button>
        </div>
        <div className="setting-option">
          <label>Notifications:</label>
          <input
            type="checkbox"
            checked={settingsNotifications}
            onChange={handleNotificationsToggle}
          />
        </div>
        <div className="setting-option">
          <label>Language:</label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="english">English</option>
            <option value="swahili">Swahili</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
