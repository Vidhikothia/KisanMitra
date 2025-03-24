import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!profilePhoto) {
      alert('Please select a profile photo.');
      return;
    }
    
    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    try {
      const response = await axios.post('http://localhost:5000/auth/user/create-educator', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        alert('Profile photo added successfully!');
        navigate('/');  // Redirect to login page
      }
    } catch (error) {
      console.error('Error uploading photo:', error.response?.data?.message || error.message);
      alert('Failed to upload profile photo. Please try again.');
    }
  };

  return (
    <div className="manage-profile">
      <h2>Add Profile Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Photo:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files[0])} 
          />
        </div>
        <button type="submit">Add Photo</button>
      </form>
    </div>
  );
};

export default ManageProfile;
