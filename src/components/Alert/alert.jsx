import React, { useEffect, useState } from 'react';
import './alert.css';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';


const Alert = ({ type, message, duration = 5000, onClose }) => {
  const [progress, setProgress] = useState(100);

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      default:
        return '';
    }
  };

  const getAlertTitleClass = () => {
    switch (type) {
      case 'success':
        return 'alert-title-success';
      case 'warning':
        return 'alert-title-warning';
      case 'error':
        return 'alert-title-error';
      default:
        return '';
    }
  };


  const getAlertTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
        return 'Error';
      default:
        return '';
    }
  };

  const getAlertIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle style={{ color: 'green' }} />; 
      case 'warning':
        return <FaExclamationTriangle style={{ color: 'orange' }} />;
      case 'error':
        return <FaTimesCircle style={{ color: 'red' }} />;
      default:
        return '';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: 'green' };
      case 'warning':
        return { backgroundColor: 'orange' };
      case 'error':
        return { backgroundColor: 'red' };
      default:
        return {};
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [duration, onClose]);


  return (
    <div className={`alert ${getAlertStyles()}`}>
      <div className="alert-icon">
        {getAlertIcon()}
      </div>
      <div className="alert-content">
        <div className={`alert-title ${getAlertTitleClass()}`}>
          {getAlertTitle()}
        </div>
        <div className="alert-message">
          {message}
        </div>
      </div>
      <div className="alert-progress" style={{ width: `${100 - progress}%`, ...getProgressColor() }} />
    </div>
  );
};

export default Alert;