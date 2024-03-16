// import React, { useState } from 'react';
// import './settings.css';

// const Settings = () => {
//   // Sample settings data
//   const [settings, setSettings] = useState({
//     theme: 'light',
//     notifications: true,
//     language: 'english',
//   });

//   // Function to handle theme change
//   const handleThemeChange = (e) => {
//     const newTheme = e.target.value;
//     setSettings({ ...settings, theme: newTheme });
//   };

//   // Function to handle notifications toggle
//   const handleNotificationsToggle = () => {
//     setSettings({ ...settings, notifications: !settings.notifications });
//   };

//   // Function to handle language change
//   const handleLanguageChange = (e) => {
//     const newLanguage = e.target.value;
//     setSettings({ ...settings, language: newLanguage });
//   };

//   return (
//     <div className="settings-container">
//       <h2>Settings</h2>
//       <div className="setting-option">
//         <label>Theme:</label>
//         <select value={settings.theme} onChange={handleThemeChange}>
//           <option value="light">Light</option>
//           <option value="dark">Dark</option>
//         </select>
//       </div>
//       <div className="setting-option">
//         <label>Notifications:</label>
//         <input
//           type="checkbox"
//           checked={settings.notifications}
//           onChange={handleNotificationsToggle}
//         />
//       </div>
//       <div className="setting-option">
//         <label>Language:</label>
//         <select value={settings.language} onChange={handleLanguageChange}>
//           <option value="english">English</option>
//           <option value="spanish">Spanish</option>
//           {/* Add more language options as needed */}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Settings;



import React, { useState } from 'react';
import './settings.css';

const Settings = () => {
  // Sample settings data
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'english',
  });

  // Function to handle theme change
  const handleThemeChange = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings({ ...settings, theme: newTheme });
  };

  // Function to handle notifications toggle
  const handleNotificationsToggle = () => {
    setSettings({ ...settings, notifications: !settings.notifications });
  };

  // Function to handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSettings({ ...settings, language: newLanguage });
  };

  return (
    <div className={`settings-container ${settings.theme === 'dark' ? 'dark-theme' : ''}`}>
      <h2>Settings</h2>
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
          {/* Add more language options as needed */}
        </select>
      </div>
    </div>
  );
};

export default Settings;
