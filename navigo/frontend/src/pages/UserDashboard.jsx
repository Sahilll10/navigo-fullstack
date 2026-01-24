import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [fares, setFares] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getFares = async () => {
    if (!pickup || !destination) {
      setError('Please enter both pickup and destination');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/rides/get-fare', {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${token}` }
      });
      setFares(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get fares');
    } finally {
      setLoading(false);
    }
  };

  const bookRide = async (vehicleType) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/rides/create',
        { pickup, destination, vehicleType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess(`Ride booked successfully! OTP: ${response.data.ride.otp}`);
      setPickup('');
      setDestination('');
      setFares(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1 className="logo">NaviGo</h1>
        <div className="nav-right">
          <span className="user-name">👋 Hi, {user.fullname.firstname}</span>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="container">
          <h2 className="dashboard-title">Book a Ride</h2>

          <div className="booking-card card">
            <div className="form-group">
              <label>Pickup Location</label>
              <input
                type="text"
                className="form-control"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
              />
            </div>

            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
              />
            </div>

            <button 
              onClick={getFares} 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Fare Estimates'}
            </button>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {fares && (
              <div className="fares-section">
                <h3>Available Rides</h3>
                <div className="fare-cards">
                  <div className="fare-card" onClick={() => bookRide('auto')}>
                    <div className="vehicle-icon">🛺</div>
                    <div className="vehicle-info">
                      <h4>Auto</h4>
                      <p className="fare-price">₹{fares.auto}</p>
                    </div>
                  </div>

                  <div className="fare-card" onClick={() => bookRide('moto')}>
                    <div className="vehicle-icon">🏍️</div>
                    <div className="vehicle-info">
                      <h4>Moto</h4>
                      <p className="fare-price">₹{fares.moto}</p>
                    </div>
                  </div>

                  <div className="fare-card" onClick={() => bookRide('car')}>
                    <div className="vehicle-icon">🚗</div>
                    <div className="vehicle-info">
                      <h4>Car</h4>
                      <p className="fare-price">₹{fares.car}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
