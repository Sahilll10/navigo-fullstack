import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserDashboard from './pages/UserDashboard';
import CaptainDashboard from './pages/CaptainDashboard';
import './App.css';

const ProtectedRoute = ({ children, type }) => {
  const { user, captain, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (type === 'user' && !user) {
    return <Navigate to="/user/login" />;
  }

  if (type === 'captain' && !captain) {
    return <Navigate to="/captain/login" />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute type="user">
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/captain/dashboard" 
          element={
            <ProtectedRoute type="captain">
              <CaptainDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
