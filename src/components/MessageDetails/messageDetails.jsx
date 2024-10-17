import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './messageDetails.css'
import user from "../../Assets/user.jpg";

const MessageDetails = ({ notifications }) => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const notification = notifications.find(notif => notif.id === parseInt(id));

    if (!notification) {
        return <div>Message not found.</div>;
    }

    return (
        <div className="notification-details">
            <h2>Message Details</h2>
            <div>
                <button onClick={() => navigate('/messages')}>Back to Messages</button>
            </div>
            <p><strong>From:</strong> {notification.sender}</p>
            <p><strong>Content:</strong> {notification.content}</p>
            <p><strong>Timestamp:</strong> {notification.timestamp}</p>
        </div>
    );
};

export default MessageDetails;