import React, { useState } from 'react';
import axios from 'axios';
import "./VideoUploadForm.css";

const VideoUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [accessType, setAccessType] = useState('basic');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file change for video
  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  // Handle file change for thumbnail
  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  // Handle form submission
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video || !thumbnail) {
      setMessage('Please select both a video and a thumbnail image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('access_type', accessType);
    formData.append('category', category);
    formData.append('video', video);
    formData.append('thumbnail', thumbnail);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:5000/content/upload_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
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
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

        <div>
          <label>
            <input type="radio" name="accessType" value="basic" checked={accessType === 'basic'} onChange={() => setAccessType('basic')} />
            Basic
          </label>
          <label>
            <input type="radio" name="accessType" value="standard" checked={accessType === 'standard'} onChange={() => setAccessType('standard')} />
            Standard
          </label>
          <label>
            <input type="radio" name="accessType" value="premium" checked={accessType === 'premium'} onChange={() => setAccessType('premium')} />
            Premium
          </label>
        </div>

        <label>Upload Video:</label>
        <input type="file" accept="video/*" onChange={handleVideoChange} required />

        <label>Upload Thumbnail:</label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} required />

        <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Video'}</button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
