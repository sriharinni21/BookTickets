import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Home() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="home-container">
      <h1 className="welcome-text">BookEz</h1>
      <div className="auth-container">
        {!showRegister ? (
          <div className="login-container">
            <h2 className="auth-header">Login</h2>
            <Login />
            <p className="auth-switch">
              Don't have an account?{' '}
              <button
                className="auth-link"
                onClick={() => setShowRegister(true)}
              >
                Register here
              </button>
            </p>
          </div>
        ) : (
          <div className="register-container">
            <h2 className="auth-header">Register</h2>
            <Register />
            <p className="auth-switch">
              Already have an account?{' '}
              <button
                className="auth-link"
                onClick={() => setShowRegister(false)}
              >
                Login here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;