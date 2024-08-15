import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:5000/user", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
          setUser(null); // Clear user data on error
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setIsAuthenticated(true);
      
      // Fetch user details after successful login
      const userResponse = await axios.get("http://127.0.0.1:5000/user", {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setUser(userResponse.data);
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false); // In case of error, update the auth state
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
