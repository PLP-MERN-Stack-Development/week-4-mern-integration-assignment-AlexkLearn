import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for user authentication on mount
    const fetchUser  = async () => {
      try {
        const response = await axios.get('/api/users/me', { withCredentials: true });
        setUser (response.data.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser (null);
        setIsAuthenticated(false);
      }
    };

    fetchUser ();
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials, { withCredentials: true });
    setUser (response.data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    setUser (null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData, { withCredentials: true });
    setUser (response.data.user);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
