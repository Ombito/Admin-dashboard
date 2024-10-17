import React, { useState } from 'react';
import './messages.css';
import { useNavigate } from 'react-router-dom';


const Messages = ({ notifications, markAsRead }) => {
  const navigate = useNavigate();

const handleViewMore = (id) => {
    notifications.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
    );
    markAsRead(id);
    navigate(`/messages/${id}`);
};

return (
    <div className="notifications-container">
        <h2>Messages</h2>
        <div className="notifications-list">
            {notifications.map(notification => (
                <div 
                    key={notification.id} 
                    className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                >
                    <p><strong>From:</strong> {notification.sender}</p>
                    <p>{notification.content}</p>
                    <p className="timestamp">{notification.timestamp}</p>
                    <button onClick={() => handleViewMore(notification.id)}>
                        {notification.isRead ? 'View Again' : 'View More'}
                    </button>
                </div>
            ))}
        </div>
    </div>
);
};


export default Messages;