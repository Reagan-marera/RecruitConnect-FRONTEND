import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [employerId, setEmployerId] = useState(localStorage.getItem('employer_id'));

  useEffect(() => {
    setEmployerId(localStorage.getItem('employer_id'));
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { email, password });
      const { access_token, employer_id } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('employer_id', employer_id);
      setToken(access_token);
      setEmployerId(employer_id);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('employer_id');
    setToken(null);
    setEmployerId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, employerId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
