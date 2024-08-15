// src/chat/UserSearch.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

const UserSearch = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth(); // Get authentication details from context

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = {};
        if (isAuthenticated && token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch('http://localhost:5000/api/users', { headers });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Sort users by username alphabetically
        const sortedUsers = data.sort((a, b) => a.username.localeCompare(b.username));
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, token]); // Depend on authentication status and token

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = users.filter(user =>
        user.username.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  return (
    <div className="user-search">
      <h3>Available Users</h3>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {filteredUsers.length === 0 && searchQuery ? (
          <li>No users found. Invite friends to join RecruitConnect.</li>
        ) : (
          filteredUsers.map(u => (
            <li key={u.id} onClick={() => onUserSelect(u)} style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ccc' }}>
              {u.username}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserSearch;
