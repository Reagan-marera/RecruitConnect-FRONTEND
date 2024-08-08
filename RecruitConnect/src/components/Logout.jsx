import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import  '../logout.css'

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth(); // Use logout function from AuthContext

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Clear tokens from local storage and session storage
      localStorage.removeItem('userAuthToken');
      localStorage.removeItem('employerAuthToken');
      sessionStorage.removeItem('userAuthToken');
      sessionStorage.removeItem('employerAuthToken');

      // Send logout request to the server
      await fetch('/logout', { method: 'POST' });

      // Call logout function from AuthContext
      logout();

      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Logging out...</p>
      ) : (
        <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      )}
    </div>
  );
};

export default Logout;
