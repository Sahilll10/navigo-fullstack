import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CaptainDashboard = () => {
  const { captain, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1 className="logo">NaviGo Captain</h1>
        <div className="nav-right">
          <span className="user-name">👨‍✈️ {captain.fullname.firstname}</span>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="container">
          <h2 className="dashboard-title">Captain Dashboard</h2>

          <div className="stats-grid">
            <div className="stat-card card">
              <div className="stat-icon">🚗</div>
              <div className="stat-info">
                <p className="stat-label">Vehicle</p>
                <p className="stat-value">{captain.vehicle.vehicleType}</p>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon">🎨</div>
              <div className="stat-info">
                <p className="stat-label">Color</p>
                <p className="stat-value">{captain.vehicle.color}</p>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon">🔢</div>
              <div className="stat-info">
                <p className="stat-label">Plate</p>
                <p className="stat-value">{captain.vehicle.plate}</p>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <p className="stat-label">Capacity</p>
                <p className="stat-value">{captain.vehicle.capacity} seats</p>
              </div>
            </div>
          </div>

          <div className="info-card card">
            <h3>Welcome, Captain {captain.fullname.firstname}!</h3>
            <p>Your account is set up and ready to go. You can now start accepting ride requests.</p>
            <p className="mt-2"><strong>Email:</strong> {captain.email}</p>
            <p><strong>Vehicle:</strong> {captain.vehicle.color} {captain.vehicle.vehicleType}</p>
          </div>

          <div className="rides-section card">
            <h3>Ride Requests</h3>
            <div className="empty-state">
              <p>🚦 No active ride requests at the moment</p>
              <p>Keep this page open to receive ride requests in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDashboard;
