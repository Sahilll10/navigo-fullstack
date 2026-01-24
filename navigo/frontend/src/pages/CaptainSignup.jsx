import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    color: '',
    plate: '',
    capacity: '',
    vehicleType: 'car'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { registerCaptain } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerCaptain(
        { firstname: formData.firstname, lastname: formData.lastname },
        formData.email,
        formData.password,
        {
          color: formData.color,
          plate: formData.plate,
          capacity: parseInt(formData.capacity),
          vehicleType: formData.vehicleType
        }
      );
      navigate('/captain/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container captain-signup">
        <div className="auth-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1 className="auth-title">Captain Sign Up</h1>
          <p className="auth-subtitle">Join as a captain and start earning</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter first name"
                minLength={3}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Enter last name"
                minLength={3}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength={6}
              required
            />
          </div>

          <h3 className="section-heading">Vehicle Details</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Vehicle Color</label>
              <input
                type="text"
                className="form-control"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., Black"
                minLength={3}
                required
              />
            </div>

            <div className="form-group">
              <label>Plate Number</label>
              <input
                type="text"
                className="form-control"
                name="plate"
                value={formData.plate}
                onChange={handleChange}
                placeholder="e.g., ABC123"
                minLength={3}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                className="form-control"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Number of seats"
                min={1}
                required
              />
            </div>

            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                className="form-control"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up as Captain'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/captain/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
