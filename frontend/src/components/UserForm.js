import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserForm.css'; // Import CSS for styling

const UserForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Select');
  const [message, setMessage] = useState(""); // To show success/error message
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      username, // Generate username from email
      email,
      // phone_number: phoneNumber,
      password,
      role,
      preferred_language: "English", // Default or change as needed
    };
  
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are stored
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // ✅ Sends full user object
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Registration successful! Redirecting to dashboard...");
        navigate("/login");
      }else{
        throw new Error(data.message || "Registration failed");
      }
  
      
      // setTimeout(() => navigate("/login"), 1500); // Redirect after success
    
    } catch (error) {
      setMessage(error.message);
      alert("Error Register in");
    }
  };
  
  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit}>

        <h2> Kem cho Kisan!</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Select">Select</option>
          <option value="Farmer">Farmer</option>
          <option value="Educator">Educator</option>
          <option value="Educator">Admin</option>

        </select>
        <button type="submit">Create Account</button>

        <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')}>Login here</button>
      </p>
      </form>

      
    </div>
  );
};

export default UserForm;
