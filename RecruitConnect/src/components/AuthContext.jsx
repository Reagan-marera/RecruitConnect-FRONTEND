import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // Fetch user details on token change
      const fetchUser = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:5000/user", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
          setUser(null); // Clear user data on error
        }
      };

      fetchUser();
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
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
