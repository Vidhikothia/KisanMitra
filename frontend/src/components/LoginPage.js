// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // For redirection
// import axios from "axios"; // To send the login request to the backend

// const LoginPage = () => {
//   const [inputValue, setInputValue] = useState("");
//   const [isPhone, setIsPhone] = useState(false);
//   const [otpTimer, setOtpTimer] = useState(0);
//   const [otpSent, setOtpSent] = useState(false);
//   const [password, setPassword] = useState(""); // For password input
//   const [otp, setOtp] = useState(""); // For OTP input
//   const [errorMessage, setErrorMessage] = useState(""); // Error handling
//   const navigate = useNavigate();

//   // Handle input change and determine if it's a phone number
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
//     setIsPhone(/^\d+$/.test(value)); // Check if input is all digits
//   };

//   // Start OTP timer
//   const startOtpTimer = () => {
//     setOtpSent(true);
//     setOtpTimer(30); // 30-second timer
//   };

//   // Countdown effect for OTP timer
//   useEffect(() => {
//     let timer;
//     if (otpTimer > 0) {
//       timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
//     } else {
//       setOtpSent(false); // Reset OTP input when timer ends
//     }
//     return () => clearTimeout(timer);
//   }, [otpTimer]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userData = isPhone
//       ? { phone_number: inputValue, otp } // For phone login
//       : { email: inputValue, password }; // For email login

//     try {
//       const response = await axios.post("http://localhost:5000/auth/login", userData, {
//         headers: { "Content-Type": "application/json" },
//       });

//       // Save token or other authentication details if needed
//       localStorage.setItem("authToken", response.data.token); // Example for saving token

//       // Redirect to home page upon successful login
//       navigate("/");

//     } catch (error) {
//       console.error("Login failed:", error);
//       setErrorMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <h2 style={styles.heading}>Login</h2>
//         {/* Email/Phone Number Input */}
//         <input
//           type="text"
//           placeholder="Enter Email or Phone Number"
//           value={inputValue}
//           onChange={handleInputChange}
//           style={styles.input}
//         />

//         {/* Conditional Rendering for Password or OTP */}
//         {inputValue && (
//           <>
//             {!isPhone ? (
//               // Password Field
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={styles.input}
//               />
//             ) : (
//               // OTP Field with Timer
//               <div style={styles.otpContainer}>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   disabled={!otpSent}
//                   style={styles.input}
//                 />
//                 {!otpSent ? (
//                   <button
//                     type="button"
//                     onClick={startOtpTimer}
//                     style={styles.otpButton}
//                   >
//                     Send OTP
//                   </button>
//                 ) : (
//                   <span style={styles.timer}>
//                     {`OTP valid for ${otpTimer} seconds`}
//                   </span>
//                 )}
//               </div>
//             )}
//           </>
//         )}

//         {/* Error Message */}
//         {errorMessage && <div style={styles.error}>{errorMessage}</div>}

//         {/* Login Button */}
//         <button type="submit" style={styles.loginButton}>
//           Login
//         </button>

//         {/* Register Link */}
//         <p>
//           <br />
//           Don't have an account?{" "}
//           <a href="/register" style={{ color: "#007BFF", textDecoration: "none" }}>
//             Register
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// // Inline styles for the component
// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh", // Increased height for better view
//     backgroundColor: "#f0f4f8", // Light background color for modern look
//     padding: "0 20px", // Added padding to prevent content from sticking to sides
//   },
//   form: {
//     width: "100%",
//     maxWidth: "500px", // Larger form for more space
//     background: "#ffffff",
//     padding: "50px",
//     borderRadius: "12px", // Rounded corners for a modern feel
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
//     textAlign: "center",
//     transition: "all 0.3s ease-in-out", // Smooth transition effect for any changes
//   },
//   heading: {
//     marginBottom: "55px",
//     color: "#333",
//     fontSize: "2rem", // Larger heading
//     fontWeight: "600", // Bold heading
//     letterSpacing: "0.5px", // Spacing between letters for readability
//   },
//   input: {
//     paddingRight: "0.2px",
//     width: "100%",
//     padding: "15px",
//     marginBottom: "40px", // Increased margin between fields
//     border: "1px solid #ddd",
//     borderRadius: "8px", // Slightly rounded corners
//     fontSize: "16px",
//     backgroundColor: "#fafafa", // Light grey background for inputs
//     transition: "border 0.3s ease", // Smooth transition when focusing on input
//   },
//   otpContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: "20px", // Margin between OTP and button
//   },
//   otpButton: {
//     padding: "12px",
//     backgroundColor: "#4CAF50", // Green for the OTP button
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontSize: "16px",
//     transition: "background-color 0.3s ease",
//   },
//   timer: {
//     color: "#FF5722",
//     fontSize: "14px",
//     marginLeft: "10px", // Small spacing between the timer and button
//   },
//   loginButton: {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#4CAF50", // Green color for the button
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "18px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease", // Smooth hover effect
//   },
//   error: {
//     color: "#FF5722",
//     fontSize: "14px",
//     marginBottom: "10px",
//   },
// };

// export default LoginPage;

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

      </div>
    </div>
  );
};

export default LoginPage;
