// src/chat/Chat.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UserSearch from './UseSearch'; // Import UserSearch component
import './Chat.css'; // Custom styles
import { toast } from 'react-toastify';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat message', (msg) => {
      if (selectedUser && msg.userId === selectedUser.id) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      } else {
        setUnreadCount((prevCount) => prevCount + 1);
      }
      toast.success('New message received!');
    });

    return () => {
      socket.off('chat message');
    };
  }, [selectedUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      socket.emit('chat message', { userId: selectedUser.id, message });
      setMessage('');
      toast.success('Message sent successfully!');
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUnreadCount(0);
  };

  return (
    <div className="chat-page">
      <UserSearch onUserSelect={handleUserSelect} />
      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <img src="/path/to/profile/icon.png" alt="Profile" className="profile-icon" />
              <h3>Chatting with {selectedUser.username}</h3>
            </div>
            <div className="chat-history">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-bubble ${msg.userId === selectedUser.id ? 'received' : 'sent'}`}
                >
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="chat-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="chat-input"
              />
              <button type="submit" className="chat-send-button">
                Send
              </button>
            </form>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
