import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserForm.css'; // Import CSS for styling

const UserForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Farmer');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('User details:', { email, password, phoneNumber, role });

    // Redirect to the login page after successful form submission
    navigate('/login');
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit}>

        <h2> Kem cho Kisan!</h2>
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
