import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

  // Handle Role-Based Redirection
  const handleAuthSuccess = (token) => {
    navigate('/');
  };

  // Email & Password Login
  const handleEmailLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
        rememberMe: isChecked,
      }, { withCredentials: true });
      handleAuthSuccess(res.data.token);
    } catch (error) {
      console.error('Email login error:', error.response?.data?.message || 'Server error');
    }
  };

  // Send OTP for Mobile Number Login
  const handleSendOtp = async () => {
    try {
      await axios.post('/auth/send-otp', { phoneNumber });
      setIsOtpSent(true);
      console.log('OTP sent to', phoneNumber);
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data?.message || 'Server error');
    }
  };

  // Verify OTP and Handle Login
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/sms-login', { phoneNumber, otp, rememberMe: isChecked });
      handleAuthSuccess(res.data.token);
    } catch (error) {
      console.error('OTP verification error:', error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="kisan-login-container">
      <div className="kisan-login-left">
        {/* Image section with farming tools illustration */}
      </div>
      
      <div className="kisan-login-right">
        <div className="login-form-wrapper">
          <h1 className="login-heading">LOGIN</h1>
          
          {loginMethod === 'email' ? (
            <form onSubmit={handleEmailLoginSubmit} className="kisan-login-form">
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  required
                />
              </div>
              
              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span>Keep me logged in</span>
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              
              <button type="submit" className="login-btn">LOGIN</button>
              
              <div className="login-method-switch">
                <p onClick={() => setLoginMethod('phone')}>
                  Login with OTP instead
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="kisan-login-form">
              <div className="form-field">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="MOBILE NO."
                  required
                />
              </div>
              
              {!isOtpSent ? (
                <button type="button" onClick={handleSendOtp} className="login-btn">
                  SEND OTP
                </button>
              ) : (
                <>
                  <div className="form-field">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="ENTER OTP"
                      required
                    />
                  </div>
                  
                  <div className="form-options">
                    <label className="remember-me">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <span>Keep me logged in</span>
                    </label>
                  </div>
                  
                  <button type="submit" className="login-btn">VERIFY & LOGIN</button>
                </>
              )}
              
              <div className="login-method-switch">
                <p onClick={() => setLoginMethod('email')}>
                  Login with email instead
                </p>
              </div>
            </form>
          )}
          
          <div className="signup-prompt">
            <p>
              Don't have an account?{' '}
              <span 
                className="signup-link" 
                onClick={() => navigate('/register')}
              >
                SIGN UP
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;