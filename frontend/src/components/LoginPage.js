import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios"; // To send the login request to the backend

const LoginPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPassword] = useState(""); // For password input
  const [otp, setOtp] = useState(""); // For OTP input
  const [errorMessage, setErrorMessage] = useState(""); // Error handling
  const navigate = useNavigate();

  // Handle input change and determine if it's a phone number
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsPhone(/^\d+$/.test(value)); // Check if input is all digits
  };

  // Start OTP timer
  const startOtpTimer = () => {
    setOtpSent(true);
    setOtpTimer(30); // 30-second timer
  };

  // Countdown effect for OTP timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
    } else {
      setOtpSent(false); // Reset OTP input when timer ends
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = isPhone
      ? { phone_number: inputValue, otp } // For phone login
      : { email: inputValue, password }; // For email login

    try {
      const response = await axios.post("http://localhost:5000/auth/login", userData, {
        headers: { "Content-Type": "application/json" },
      });

      // Save token or other authentication details if needed
      localStorage.setItem("authToken", response.data.token); // Example for saving token

      // Redirect to home page upon successful login
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Login</h2>
        {/* Email/Phone Number Input */}
        <input
          type="text"
          placeholder="Enter Email or Phone Number"
          value={inputValue}
          onChange={handleInputChange}
          style={styles.input}
        />

        {/* Conditional Rendering for Password or OTP */}
        {inputValue && (
          <>
            {!isPhone ? (
              // Password Field
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            ) : (
              // OTP Field with Timer
              <div style={styles.otpContainer}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!otpSent}
                  style={styles.input}
                />
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={startOtpTimer}
                    style={styles.otpButton}
                  >
                    Send OTP
                  </button>
                ) : (
                  <span style={styles.timer}>
                    {`OTP valid for ${otpTimer} seconds`}
                  </span>
                )}
              </div>
            )}
          </>
        )}

        {/* Error Message */}
        {errorMessage && <div style={styles.error}>{errorMessage}</div>}

        {/* Login Button */}
        <button type="submit" style={styles.loginButton}>
          Login
        </button>

        {/* Register Link */}
        <p>
          <br />
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#007BFF", textDecoration: "none" }}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Increased height for better view
    backgroundColor: "#f0f4f8", // Light background color for modern look
    padding: "0 20px", // Added padding to prevent content from sticking to sides
  },
  form: {
    width: "100%",
    maxWidth: "500px", // Larger form for more space
    background: "#ffffff",
    padding: "50px",
    borderRadius: "12px", // Rounded corners for a modern feel
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    textAlign: "center",
    transition: "all 0.3s ease-in-out", // Smooth transition effect for any changes
  },
  heading: {
    marginBottom: "55px",
    color: "#333",
    fontSize: "2rem", // Larger heading
    fontWeight: "600", // Bold heading
    letterSpacing: "0.5px", // Spacing between letters for readability
  },
  input: {
    paddingRight: "0.2px",
    width: "100%",
    padding: "15px",
    marginBottom: "40px", // Increased margin between fields
    border: "1px solid #ddd",
    borderRadius: "8px", // Slightly rounded corners
    fontSize: "16px",
    backgroundColor: "#fafafa", // Light grey background for inputs
    transition: "border 0.3s ease", // Smooth transition when focusing on input
  },
  otpContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px", // Margin between OTP and button
  },
  otpButton: {
    padding: "12px",
    backgroundColor: "#4CAF50", // Green for the OTP button
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  timer: {
    color: "#FF5722",
    fontSize: "14px",
    marginLeft: "10px", // Small spacing between the timer and button
  },
  loginButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4CAF50", // Green color for the button
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth hover effect
  },
  error: {
    color: "#FF5722",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default LoginPage;
