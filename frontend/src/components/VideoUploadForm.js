import React, { useState } from 'react';
import './VideoUploadForm.css';

// Video Category Component
const VideoCategorySelect = ({ setCategory }) => {
  const [otherCategory, setOtherCategory] = useState('');

  const handleCategoryChange = (e) => {
    if (e.target.value === 'Other') {
      setCategory(otherCategory);
    } else {
      setCategory(e.target.value);
    }
  };

  return (
    <div className="video-category">
      <label htmlFor="category">Category:</label>
      <select id="category" onChange={handleCategoryChange}>
        <option value="Soil Related">Soil Related</option>
        <option value="Weather">Weather</option>
        <option value="Agriculture Tips">Agriculture Tips</option>
        <option value="Farming Practices">Farming Practices</option>
        <option value="Other">Other</option>
      </select>

      {otherCategory && (
        <div className="other-category">
          <label htmlFor="otherCategory">Please specify:</label>
          <input
            type="text"
            id="otherCategory"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

// Video Type Radio Buttons Component
const RadioButtons = ({ setVideoType }) => {
  return (
    <div className="video-type">
      <label>Video Type:</label>
      <div>
        <input
          type="radio"
          id="premium"
          name="videoType"
          value="Premium"
          onChange={(e) => setVideoType(e.target.value)}
        />
        <label htmlFor="premium">Premium</label>
      </div>
      <div>
        <input
          type="radio"
          id="standard"
          name="videoType"
          value="Standard"
          onChange={(e) => setVideoType(e.target.value)}
        />
        <label htmlFor="standard">Standard</label>
      </div>
    </div>
  );
};

// Main Video Upload Form Component
const VideoUploadForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [videoType, setVideoType] = useState('');

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('videoType', videoType);

    // Send the data to your backend API for video upload
    try {
      const response = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Video uploaded successfully');
      } else {
        alert('Video upload failed');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="video-upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <VideoCategorySelect setCategory={setCategory} />

        {/* Video Type */}
        <RadioButtons setVideoType={setVideoType} />

        {/* Video File Upload */}
        <div className="input-group">
          <label htmlFor="video">Video File:</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
