import React, { useState } from 'react';
import axios from 'axios';
import "./VideoUploadForm.css";

const VideoUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creator, setCreator] = useState(''); // Replace with actual user ID from auth
  const [category, setCategory] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file change
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setMessage('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('creator', creator);
    formData.append('category', category);
    formData.append('is_premium', isPremium);
    formData.append('video', video);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:5000/api/content/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setUploading(false);
    } catch (error) {
      setMessage('Upload failed. Try again.');
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input type="text" placeholder="Creator ID" value={creator} onChange={(e) => setCreator(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <label>
          <input type="checkbox" checked={isPremium} onChange={() => setIsPremium(!isPremium)} />
          Premium Content
        </label>
        <input type="file" accept="video/*" onChange={handleFileChange} required />
        <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Video'}</button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
