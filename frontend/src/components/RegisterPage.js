import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // You'll need to create this CSS file

const RegisterPage = () => {
  const navigate = useNavigate();

  // Form States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Educator');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const userData = {
      username,
      email,
      phone_number: phoneNumber,
      password,
      role,
      preferred_language: preferredLanguage,
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/register', userData, { withCredentials: true });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="kisan-login-container">
      <div className="kisan-login-left">
        {/* Image section with farming tools illustration */}
      </div>
      
      <div className="kisan-login-right">
        <div className="login-form-wrapper">
          <h1 className="login-heading">SIGN UP</h1>
          
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          
          <form onSubmit={handleSubmit} className="kisan-login-form">
            <div className="form-field">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="USERNAME"
                required
              />
            </div>
            
            <div className="form-field">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL"
                required
              />
            </div>
            
            <div className="form-field">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="MOBILE NUMBER"
                required
              />
            </div>
            
            <div className="form-field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                required
              />
            </div>
            
            <div className="form-field">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="CONFIRM PASSWORD"
                required
              />
            </div>
            
            <div className="form-field select-field">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>SELECT ROLE</option>
                <option value="Admin">Admin</option>
                <option value="Educator">Educator</option>
                <option value="Farmer">Farmer</option>
              </select>
            </div>
            
            <div className="form-field select-field">
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                required
              >
                <option value="" disabled>SELECT LANGUAGE</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Gujarati">Gujarati</option>
              </select>
            </div>
            
            <button type="submit" className="login-btn">REGISTER</button>
          </form>
          
          <div className="signup-prompt">
            <p>
              Already have an account?{' '}
              <span 
                className="signup-link" 
                onClick={() => navigate('/login')}
              >
                LOGIN
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;