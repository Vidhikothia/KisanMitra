

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from 'jwt-decode'; 
import axios from 'axios';
import './LoginForm.css'; 

const LoginPage = () => {
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
    // const decodedToken = jwt_decode(token);
    // const { role } = decodedToken;

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
  // const handleGoogleLoginSuccess = async (response) => {
  //   try {
  //     const res = await axios.post('/auth/google-login', { token: response.credential });
  //     handleAuthSuccess(res.data.token);
  //   } catch (error) {
  //     console.error('Google login error:', error);
  //   }
  // };

  // 📧 Email & Password Login
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
        {/* <GoogleLogin 
          onSuccess={handleGoogleLoginSuccess} 
          onError={() => console.log('Google login failed')} 
        /> */}

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
        <p>
  Don't have an account?{' '}
  <span 
    className="signup-link" 
    onClick={() => navigate('/register')} 
    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
  >
    Sign Up
  </span>
</p>

      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './LoginForm.css';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [loginMethod, setLoginMethod] = useState(''); // 'email' or 'phone'

//   const handleAuthSuccess = (token) => {
//     navigate('/');
//   };

//   // 📧 Email & Password Login
//   const handleEmailLoginSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const res = await axios.post('http://localhost:5000/auth/login', {
//             email,
//             password,
//             rememberMe: isChecked,
//           }, { withCredentials: true });
//           handleAuthSuccess(res.data.token);
//         } catch (error) {
//           console.error('Email login error:', error.response?.data?.message || 'Server error');
//         }
//       };

//   // 📱 Send OTP for Mobile Number Login
//   const handleSendOtp = async () => {
//     try {
//       await axios.post('http://localhost:5000/auth/send-otp', { phoneNumber });
//       setIsOtpSent(true);
//       console.log('OTP sent to', phoneNumber);
//     } catch (error) {
//       console.error('Error sending OTP:', error.response?.data?.message || 'Server error');
//     }
//   };

//   // 🔢 Verify OTP and Handle Login
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/auth/sms-login', { phoneNumber, otp, rememberMe: isChecked });
//       handleAuthSuccess(res.data.token);
//     } catch (error) {
//       console.error('OTP verification error:', error.response?.data?.message || 'Server error');
//     }
//   };

//   return (
//     <div className="login-form-container">
//       <div className="login-form">
//         <h2>Login</h2>

//         {/* Toggle between Email or Phone Login */}
//         <label>Enter Email or Phone Number:</label>
//         <input
//           type="text"
//           value={email || phoneNumber}
//           onChange={(e) => {
//             const value = e.target.value;
//             if (/^\d+$/.test(value)) {
//               setPhoneNumber(value);
//               setEmail('');
//               setLoginMethod('phone');
//             } else {
//               setEmail(value);
//               setPhoneNumber('');
//               setLoginMethod('email');
//             }
//           }}
//           required
//         />

//         {/* Show Password if Email is entered */}
//         {loginMethod === 'email' && (
//           <>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             {/* Remember Me */}
//             <label>
//               <input
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={() => setIsChecked(!isChecked)}
//               />
//               Remember Me
//             </label>

//             <button onClick={handleEmailLoginSubmit}>Login with Email</button>
//           </>
//         )}

//         {/* Show OTP if Phone Number is entered */}
//         {loginMethod === 'phone' && (
//           <>
//             {!isOtpSent ? (
//               <button onClick={handleSendOtp}>Send OTP</button>
//             ) : (
//               <>
//                 <label>Enter OTP:</label>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                 />

//                 {/* Remember Me */}
//                 <label>
//                 Remember Me
//                   <input
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={() => setIsChecked(!isChecked)}
//                   />
                 
//                 </label>

//                 <button onClick={handleOtpSubmit}>Verify OTP</button>
//               </>
//             )}
//           </>
//         )}

//         {/* Signup Link */}
//         <p>
//           Don't have an account? <span className="signup-link" onClick={() => navigate('/register')}>Sign Up</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
