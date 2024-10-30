import React, { createContext, useState, useContext } from 'react';
import Alert from '../components/Alert/alert';


const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ type: '', message: '', show: false });


  const showAlert = (type, message) => {
    setAlert({ type, message, show: true });
    
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert.show && <Alert type={alert.type} message={alert.message} />}
    </AlertContext.Provider>
  );
};

export default AlertContext;