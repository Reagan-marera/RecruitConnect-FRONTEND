// src/chat/UserSearch.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

const UserSearch = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const { isAuthenticated, token, user } = useAuth(); // Get user details from context

  useEffect(() => {
    if (isAuthenticated) { // Ensure the user is authenticated before fetching users
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` } // Include the token in the request
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          
          // Filter out the current user from the list of users
          const filteredUsers = data.filter(u => u.id !== user.id);
          setUsers(filteredUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [isAuthenticated, token, user]); // Depend on authentication status and user data

  return (
    <div className="user-search">
      <h3>Available Users</h3>
      <ul>
        {!isAuthenticated ? (
          <li>Please log in to see the list of users.</li>
        ) : users.length === 0 ? (
          <li>No users available. Invite friends to join RecruitConnect.</li>
        ) : (
          users.map(u => (
            <li key={u.id} onClick={() => onUserSelect(u)}>
              {u.username}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
