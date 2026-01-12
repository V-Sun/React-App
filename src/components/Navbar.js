import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>Momo Blog</h1>
        </Link>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <Link to="/create" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                Create Post
              </Link>
              <Link to="/my-posts" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                My Posts
              </Link>
              <Link to="/profile" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className="navbar-link btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="navbar-link btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}

          <button onClick={toggleDarkMode} className="theme-toggle" aria-label="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
