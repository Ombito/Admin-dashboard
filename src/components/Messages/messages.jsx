import React, { useState } from 'react';
import './messages.css';

const Messages = ({ notifications, markAsRead }) => {
  

const handleViewMore = (id) => {
    // Mark the notification as read
    notifications.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
    );
    // Here you can also add logic to display more details about the notification
    alert(`Viewing notification from ${notifications.find(notif => notif.id === id).sender}: "${notifications.find(notif => notif.id === id).content}"`);
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