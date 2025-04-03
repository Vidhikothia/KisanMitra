import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './BecomeEducator.css';
import { useNavigate } from 'react-router-dom';

const BecomeEducator = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Experience options
  const experienceOptions = [
    { value: '0-5', label: '0-5 Years' },
    { value: '6-10', label: '6-10 Years' },
    { value: '11-15', label: '11-15 Years' },
    { value: '16-20', label: '16-20 Years' },
    { value: '20+', label: '20+ Years' }
  ];

  // Handle photo selection and preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!profilePhoto) {
      alert('Please select a profile photo.');
      return;
    }
    if (!experience) {
      alert('Please select your years of experience.');
      return;
    }
    if (!bio || bio.trim().split(/\s+/).length > 50) {
      alert('Please enter a bio within 50 words.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', profilePhoto);
    formData.append('bio', bio);

    try {
      const response = await axios.post('http://localhost:5000/auth/user/create-educator', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });

      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });

            navigate('/login');
    } catch (error) {
      console.error('Error creating educator profile:', error.response?.data?.message || error.message);
      alert('Failed to create educator profile. Please try again.');
    }
  };

  // Close form and navigate back
  const handleClose = () => {
    navigate('/');
  };

  // Handle click outside of form
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        handleClose();
      }
    };

    // Add event listener to the document
    document.addEventListener('mousedown', handleOutsideClick);

    // Prevent scrolling of background
    document.body.style.overflow = 'hidden';

    // Cleanup the event listener and restore scrolling
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="educator-popup-overlay">
      <div 
        ref={formRef}
        className="educator-popup-container"
      >
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="educator-popup-close"
          aria-label="Close"
        >
          {/* CSS will create the cross */}
        </button>

        <div className="educator-popup-header">
          <h2>Become an Educator on Kisan Mitra</h2>
          <p>Share your agricultural expertise and help farmers grow</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Photo Upload */}
          <div className="profile-photo-upload">
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handlePhotoChange} 
              style={{ display: 'none' }}
            />
            <div 
              className="profile-photo-circle"
              onClick={() => fileInputRef.current.click()}
            >
              {photoPreview ? (
                <img 
                  src={photoPreview} 
                  alt="Profile" 
                />
              ) : (
                <div className="profile-photo-placeholder">
                  <span>Upload Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Experience Dropdown */}
          <div className="form-group">
            <label>Years of Experience</label>
            <select 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)}
              required
            >
              <option value="">Select Experience</option>
              {experienceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bio Textarea */}
          <div className="form-group">
            <label>Professional Bio (Max 50 words)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share a brief introduction about your agricultural background and expertise"
              maxLength={300}
              required
            />
            <div className="word-count">
              {bio ? `${bio.trim().split(/\s+/).length} / 50 words` : '0 / 50 words'}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="become-educator-btn"
          >
            Become an Educator
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeEducator;