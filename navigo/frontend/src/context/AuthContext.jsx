// Developer: Sahil Kumar (3252)
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [captain, setCaptain] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set base URL dynamically. Uses Render in production, and localhost for local dev.
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (token) {
      if (userType === 'user') {
        fetchUserProfile(token);
      } else if (userType === 'captain') {
        fetchCaptainProfile(token);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    } finally {
      setLoading(false);
    }
  };

  const fetchCaptainProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/captains/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCaptain(response.data.captain);
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', 'user');
    setUser(response.data.user);
    return response.data;
  };

  const registerUser = async (fullname, email, password) => {
    const response = await axios.post(`${API_URL}/users/register`, {
      fullname,
      email,
      password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', 'user');
    setUser(response.data.user);
    return response.data;
  };

  const loginCaptain = async (email, password) => {
    const response = await axios.post(`${API_URL}/captains/login`, {
      email,
      password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', 'captain');
    setCaptain(response.data.captain);
    return response.data;
  };

  const registerCaptain = async (fullname, email, password, vehicle) => {
    const response = await axios.post(`${API_URL}/captains/register`, {
      fullname,
      email,
      password,
      vehicle
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userType', 'captain');
    setCaptain(response.data.captain);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setUser(null);
    setCaptain(null);
  };

  const value = {
    user,
    captain,
    loading,
    loginUser,
    registerUser,
    loginCaptain,
    registerCaptain,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};