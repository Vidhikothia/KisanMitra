import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './LoginForm.css'; // Import the CSS file for styling

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleLoginSuccess = (response) => {
    // Handle successful Google login
    console.log('Google login success:', response);

    // Redirect to the Dashboard page after successful login
    navigate('/dashboard');
  };

  const handleLoginError = () => {
    console.log('Google login failed');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login details:', { email, password, phoneNumber });
    navigate('/dashboard');
  };

  return (
    <div className="login-form-container">

      <div className="login-options">
        {/* Google Login Button */}
        <GoogleLogin 
          onSuccess={handleLoginSuccess} 
          onError={handleLoginError} 
        />

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="email-login-form">
          <h2>Or Login with Email</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="keep-logged-in">
            <input
              type="checkbox"
              id="keep-logged-in"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            Keep me logged in
          </label>

          <button type="submit">Login</button>
        </form>

        {/* SMS Login Form */}
        <form className="sms-login-form">
          <h2>Or Login with SMS</h2>
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="text"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>

        
      </div>
    </div>
  );
};

export default LoginForm;
