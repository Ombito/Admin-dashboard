import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import { AlertProvider } from './context/alertContext';
import Sidebar from '../src/components/Sidebar/sidebar';
import Home from '../src/components/Home/home';
import Products from '../src/components/Products/products';
import Orders from '../src/components/Orders/orders';
import Users from '../src/components/Users/users';
import UserDetails from '../src/components/UserDetails/userDetails';
import Discounts from '../src/components/Discounts/discounts';
import Giftcard from '../src/components/Giftcard/giftcard';
import Messages from '../src/components/Messages/messages';
import MessageDetails from '../src/components/MessageDetails/messageDetails';
import Invoices from '../src/components/Invoices/invoices';
import Settings from '../src/components/Settings/settings';
import SignIn from '../src/components/Signin/signin';


function App() {
  const [user, setUser] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState('light');
  const [settingsNotifications, setSettingsNotifications] = useState(true);
  const [language, setLanguage] = useState('english');

  const [notifications, setNotifications] = useState([
    { id: 1, sender: 'System', content: 'Your profile has been updated.', timestamp: '2024-10-17 10:30 AM', isRead: false },
    { id: 2, sender: 'Admin', content: 'New features have been added to your account.', timestamp: '2024-10-16 3:45 PM', isRead: false },
    { id: 3, sender: 'System', content: 'Scheduled maintenance will occur tonight.', timestamp: '2024-10-14 9:00 AM', isRead: true },
    { id: 4, sender: 'Support', content: 'We’re here to help! Contact support if you have any questions.', timestamp: '2024-10-09 2:45 PM', isRead: false },
    { id: 5, sender: 'System', content: 'New security updates are available. Please review them.', timestamp: '2024-10-08 9 AM', isRead: false },
    { id: 6, sender:'System' ,content:'Explore your dashboard to see personalized recommendations.' ,timestamp:'2024 -10 -07 9 AM' ,isRead:false},
    { id :7 ,sender:'Admin' ,content:'Set up two-factor authentication for added security.' ,timestamp:'2024 -10 -06 3 PM' ,isRead:false},
]);

  useEffect(() => {
    const savedUser = Cookies.get('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      Cookies.set('user', JSON.stringify(user), { expires: 7 });
    } else {
      Cookies.remove('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id) => {
      setNotifications(notifications.map(notif => 
          notif.id === id ? { ...notif, isRead: true } : notif
      ));
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  useEffect(() => {
    const savedTheme = Cookies.get('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    const localLanguage = window.localStorage.getItem('language') || 'english';

    if (localTheme) {
      setTheme(localTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    setLanguage(localLanguage);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    window.localStorage.setItem('theme', theme);  
    window.localStorage.setItem('language', language); 
  }, [theme, notifications, language]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };




  return (
    <AlertProvider>
      <div className='app'>
      {user ? (
        <div className='home-app'>
          <div className='dashboard-landing'>
          {location.pathname !== '/signin' && <Sidebar setUser={setUser} notifications={notifications}/>}
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/messages" element={<Messages notifications={notifications} markAsRead={markAsRead}/>} />
              <Route path="/messages/:id" element={<MessageDetails notifications={notifications} />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user-details" element={<UserDetails />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/gift&vouchers" element={<Giftcard />} />
              <Route path="/settings" element={<Settings theme={theme} toggleTheme={toggleTheme} settingsNotifications={settingsNotifications} setSettingsNotifications={setSettingsNotifications} language={language} setLanguage={setLanguage} />} />
              <Route path="/signin" element={<SignIn setUser={setUser}/>} />
            </Routes>
          </div>
        </div>
        ) : (
          <SignIn setUser={setUser} />
        )}
      </div>
    </AlertProvider>
  )
}

export default App;
