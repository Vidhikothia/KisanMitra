// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
// import './LoginForm.css'; // Import the CSS file for styling

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isChecked, setIsChecked] = useState(false);

//   const handleLoginSuccess = (response) => {
//     // Handle successful Google login
//     console.log('Google login success:', response);

//     // Redirect to the Dashboard page after successful login
//     navigate('/dashboard');
//   };

//   const handleLoginError = () => {
//     console.log('Google login failed');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login details:', { email, password, phoneNumber });
//     navigate('/dashboard');
//   };

//   return (
//     <div className="login-form-container">

//       <div className="login-options">
//         {/* Google Login Button */}
//         <GoogleLogin 
//           onSuccess={handleLoginSuccess} 
//           onError={handleLoginError} 
//         />

//         {/* Email Login Form */}
//         <form onSubmit={handleSubmit} className="email-login-form">
//           <h2>Or Login with Email</h2>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <label htmlFor="keep-logged-in">
//             <input
//               type="checkbox"
//               id="keep-logged-in"
//               checked={isChecked}
//               onChange={() => setIsChecked(!isChecked)}
//             />
//             Keep me logged in
//           </label>

//           <button type="submit">Login</button>
//         </form>

//         {/* SMS Login Form */}
//         <form className="sms-login-form">
//           <h2>Or Login with SMS</h2>
//           <label htmlFor="phone-number">Phone Number:</label>
//           <input
//             type="text"
//             id="phone-number"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//           />
//           <button type="submit">Send OTP</button>
//         </form>

        
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'; 
import axios from 'axios';
import './LoginForm.css'; 

const LoginForm = () => {
  const navigate = useNavigate();

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // 🔑 Handle Role-Based Redirection
  const handleAuthSuccess = (token) => {
    const decodedToken = jwt_decode(token);
    const { role } = decodedToken;

    // if (role === 'admin') {
    //   navigate('/admin-dashboard');
    // } else if (role === 'educator') {
    //   navigate('/educator-dashboard');
    // } else if (role === 'student') {
    //   navigate('/student-dashboard');
    // } else {
      navigate('/');
    // }
  };

  // 🌐 Google Login
  const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('/auth/google-login', { token: response.credential });
      handleAuthSuccess(res.data.token);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  // 📧 Email & Password Login
  const handleEmailLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', {
        email,
        password,
        rememberMe: isChecked,
      });
      handleAuthSuccess(res.data.token);
    } catch (error) {
      console.error('Email login error:', error.response?.data?.message || 'Server error');
    }
  };

  // 📱 Send OTP for Mobile Number Login
  const handleSendOtp = async () => {
    try {
      await axios.post('/auth/send-otp', { phoneNumber });
      setIsOtpSent(true);
      console.log('OTP sent to', phoneNumber);
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data?.message || 'Server error');
    }
  };

  // 🔢 Verify OTP and Handle Login
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/sms-login', { phoneNumber, otp,rememberMe: isChecked, });
      handleAuthSuccess(res.data.token);
    } catch (error) {
      console.error('OTP verification error:', error.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-options">

        {/* 🌐 Google Login Button */}
        <GoogleLogin 
          onSuccess={handleGoogleLoginSuccess} 
          onError={() => console.log('Google login failed')} 
        />

        {/* 📧 Email Login Form */}
        <form onSubmit={handleEmailLoginSubmit} className="email-login-form">
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

        {/* 📱 SMS Login Form */}
        <form onSubmit={handleOtpSubmit} className="sms-login-form">
          <h2>Or Login with SMS</h2>
          <label htmlFor="phone-number">Phone Number:</label>
          <input
            type="text"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="button" onClick={handleSendOtp}>Send OTP</button>

          {isOtpSent && (
            <>
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
              <button type="submit">Verify OTP</button>
            </>
          )}
        </form>

      </div>
    </div>
  );
};

export default LoginForm;
