import React, { useState } from 'react';
import './messages.css';
import { useNavigate } from 'react-router-dom';
import user from "../../Assets/user.jpg";

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
        <div className="navbar-div">
            <h2>Messages</h2>
            <div className='sidebar-username'>
            <div className="admin-profile">
                <img src={user} alt="avatar" />
            </div>
            </div>
        </div>
        <div className="notifications-list">
            {notifications.map(notification => (
                <div 
                    key={notification.id} 
                    className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                >
                    <p><strong>{notification.sender}</strong></p>
                    <p>{notification.content}</p>
                    <p className="timestamp">{notification.timestamp}</p>
                    <div className="viewMore-button" onClick={() => handleViewMore(notification.id)}>
                        {notification.isRead ? 'View Again' : 'View More'}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};


export default Messages;