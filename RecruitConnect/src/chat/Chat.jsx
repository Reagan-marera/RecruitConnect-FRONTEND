import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import UserSearch from './UseSearch'; // Corrected import path
import './Chat.css'; // Custom styles
import { toast } from 'react-toastify';

// Initialize socket connection
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

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('chat message');
      socket.off('disconnect');
    };
  }, [selectedUser]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      socket.emit('chat message', { userId: selectedUser.id, message });
      setMessage('');
      toast.success('Message sent successfully!');
    } else {
      toast.error('Please select a user and enter a message.');
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear previous chat history when a new user is selected
    setUnreadCount(0);
  };

  return (
    <div className="chat-page">
      <UserSearch onUserSelect={handleUserSelect} />
      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="chat-header">
              {/* Replace with dynamic profile icon */}
              <img src="https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg" alt="Profile" className="profile-icon" />
              <h3>{selectedUser.username}</h3>
              <span className="unread-count">{unreadCount > 0 && `(${unreadCount})`}</span>
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
