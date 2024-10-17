import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './messageDetails.css'
import user from "../../Assets/user.jpg";
import { FaChevronLeft } from 'react-icons/fa';


const MessageDetails = ({ notifications }) => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const notification = notifications.find(notif => notif.id === parseInt(id));

    if (!notification) {
        return <div>Message not found.</div>;
    }

    return (
        <div className="notification-details">
            <div className="navbar-div">
                <h2>Message</h2>
                <div className='sidebar-username'>
                <div className="admin-profile">
                    <img src={user} alt="avatar" />
                </div>
                </div>
            </div>
            <div className='notification-details-hero'>
                <div className='back-to-notification' onClick={() => navigate('/messages')}><FaChevronLeft className="back-icon" /> BACK TO MESSAGES</div>
                <p><strong> {notification.sender}</strong></p>
                <p>{notification.content}</p>
                <p>{notification.timestamp}</p>
            </div>
        </div>
    );
};

export default MessageDetails;