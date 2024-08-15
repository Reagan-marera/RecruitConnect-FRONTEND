// src/components/FloatingChatButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingChatButton.css'; // Add your custom styles

const FloatingChatButton = ({ unreadCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chat');
  };

  return (
    <button className="floating-chat-button" onClick={handleClick}>
      <i className="fas fa-comments"></i>
      {unreadCount > 0 && <span className="chat-count">{unreadCount}</span>}
    </button>
  );
};

export default FloatingChatButton;
