import React, { useState } from 'react';

const ManageProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', { name, email, profilePhoto });
    alert('Profile updated successfully!');
  };

  return (
    <div className="manage-profile">
      <h2>Manage Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Profile Photo:</label>
          <input type="file" onChange={(e) => setProfilePhoto(e.target.files[0])} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ManageProfile;
