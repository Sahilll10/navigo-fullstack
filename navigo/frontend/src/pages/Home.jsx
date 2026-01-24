import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">NaviGo</h1>
          <div className="nav-links">
            <Link to="/user/login" className="btn btn-outline">User Login</Link>
            <Link to="/captain/login" className="btn btn-primary">Captain Login</Link>
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Your Ride, Your Way</h1>
            <p className="hero-subtitle">
              Book rides instantly or drive and earn with NaviGo
            </p>
            <div className="hero-buttons">
              <Link to="/user/signup" className="btn btn-primary btn-lg">
                Get a Ride
              </Link>
              <Link to="/captain/signup" className="btn btn-secondary btn-lg">
                Become a Captain
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2 className="section-title">Why Choose NaviGo?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Multiple Vehicle Options</h3>
              <p>Choose from Auto, Moto, or Car based on your needs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Transparent Pricing</h3>
              <p>Know your fare before you book with no hidden charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Booking</h3>
              <p>Book your ride in seconds with our easy-to-use app</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 NaviGo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
