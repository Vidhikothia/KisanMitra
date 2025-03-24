// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import "./VideoUploadForm.css";

// // const VideoUploadForm = () => {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [accessType, setAccessType] = useState('basic');
// //   const [video, setVideo] = useState(null);
// //   const [thumbnail, setThumbnail] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [message, setMessage] = useState('');

// //   const categories = ["Agriculture", "Soil", "Weather", "Pesticides", "Fertilizers"];

// //   const handleVideoChange = (e) => {
// //     setVideo(e.target.files[0]);
// //   };

// //   const handleThumbnailChange = (e) => {
// //     setThumbnail(e.target.files[0]);
// //   };

// //   const handleUpload = async (e) => {
// //     e.preventDefault();
// //     if (!video || !thumbnail) {
// //       setMessage('Please select both a video and a thumbnail image.');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('title', title);
// //     formData.append('description', description);
// //     formData.append('access_type', accessType);
// //     formData.append('category', category);
// //     formData.append('video', video);
// //     formData.append('thumbnail', thumbnail);

// //     try {
// //       setUploading(true);
// //       const response = await axios.post('http://localhost:5000/content/upload_video', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //         withCredentials: true,
// //       });

// //       setMessage(response.data.message);
// //       setUploading(false);
// //     } catch (error) {
// //       setMessage('Upload failed. Try again.');
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <div className="upload-container">
// //       <h2>Upload Video</h2>
// //       {message && <p>{message}</p>}
// //       <form onSubmit={handleUpload}>
// //         <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
// //         <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

// //         {/* Dropdown for category selection */}
// //         <label>Select Category:</label>
// //         <select value={category} onChange={(e) => setCategory(e.target.value)} required>
// //           <option value="" disabled>Select a category</option>
// //           {categories.map((cat, index) => (
// //             <option key={index} value={cat}>{cat}</option>
// //           ))}
// //         </select>

// //         <div>
// //           <label>
// //             <input type="radio" name="accessType" value="basic" checked={accessType === 'basic'} onChange={() => setAccessType('basic')} />
// //             Basic
// //           </label>
// //           <label>
// //             <input type="radio" name="accessType" value="standard" checked={accessType === 'standard'} onChange={() => setAccessType('standard')} />
// //             Standard
// //           </label>
// //           <label>
// //             <input type="radio" name="accessType" value="premium" checked={accessType === 'premium'} onChange={() => setAccessType('premium')} />
// //             Premium
// //           </label>
// //         </div>

// //         <label>Upload Video:</label>
// //         <input type="file" accept="video/*" onChange={handleVideoChange} required />

// //         <label>Upload Thumbnail:</label>
// //         <input type="file" accept="image/*" onChange={handleThumbnailChange} required />

// //         <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Video'}</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default VideoUploadForm;
// import React, { useState } from 'react';
// import axios from 'axios';
// import "./VideoUploadForm.css";

// const VideoUploadForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [accessType, setAccessType] = useState('basic');
//   const [video, setVideo] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');
//   const [videoName, setVideoName] = useState('');
//   const [thumbnailName, setThumbnailName] = useState('');
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

//   const categories = ["Agriculture", "Soil", "Weather", "Pesticides", "Fertilizers"];

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideo(file);
//       setVideoName(file.name);
//     }
//   };

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setThumbnail(file);
//       setThumbnailName(file.name);
//     }
//   };

//   const handleCategorySelect = (cat) => {
//     setCategory(cat);
//     setShowCategoryDropdown(false);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!video || !thumbnail) {
//       setMessage('Please select both a video and a thumbnail image.');
//       setMessageType('error');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('access_type', accessType);
//     formData.append('category', category);
//     formData.append('video', video);
//     formData.append('thumbnail', thumbnail);

//     try {
//       setUploading(true);
//       const response = await axios.post('http://localhost:5000/content/upload_video', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         withCredentials: true,
//       });

//       setMessage(response.data.message);
//       setMessageType('success');
//       setUploading(false);
      
//       // Reset form after successful upload
//       setTitle('');
//       setDescription('');
//       setCategory('');
//       setAccessType('basic');
//       setVideo(null);
//       setThumbnail(null);
//       setVideoName('');
//       setThumbnailName('');
//     } catch (error) {
//       setMessage('Upload failed. Try again.');
//       setMessageType('error');
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload Video</h2>
      
//       {message && (
//         <div className={`message ${messageType}`}>
//           {message}
//         </div>
//       )}
      
//       <form onSubmit={handleUpload}>
//         <div className="form-section">
//           <h3>Video Details</h3>
//           <label htmlFor="title">Title</label>
//           <input 
//             type="text" 
//             id="title"
//             placeholder="Enter video title" 
//             value={title} 
//             onChange={(e) => setTitle(e.target.value)} 
//             required 
//           />
          
//           <label htmlFor="description">Description</label>
//           <textarea 
//             id="description"
//             placeholder="Write a description for your video" 
//             value={description} 
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>

//           <label htmlFor="category">Category</label>
//           <div className="custom-dropdown">
//             <div 
//               className="dropdown-selected"
//               onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//             >
//               {category || "Select a category"}
//               <span className="dropdown-arrow">▼</span>
//             </div>
//             {showCategoryDropdown && (
//               <div className="dropdown-options">
//                 {categories.map((cat, index) => (
//                   <div 
//                     key={index} 
//                     className="dropdown-option" 
//                     onClick={() => handleCategorySelect(cat)}
//                   >
//                     {cat}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <input 
//               type="hidden" 
//               name="category" 
//               value={category} 
//               required
//             />
//           </div>
//         </div>

//         <div className="form-section">
//           <h3>Access Level</h3>
//           <div className="radio-group">
//             <div className="radio-option">
//               <input 
//                 type="radio" 
//                 id="basic" 
//                 name="accessType" 
//                 value="basic" 
//                 checked={accessType === 'basic'} 
//                 onChange={() => setAccessType('basic')} 
//               />
//               <label htmlFor="basic">Basic</label>
//             </div>
            
//             <div className="radio-option">
//               <input 
//                 type="radio" 
//                 id="standard" 
//                 name="accessType" 
//                 value="standard" 
//                 checked={accessType === 'standard'} 
//                 onChange={() => setAccessType('standard')} 
//               />
//               <label htmlFor="standard">Standard</label>
//             </div>
            
//             <div className="radio-option">
//               <input 
//                 type="radio" 
//                 id="premium" 
//                 name="accessType" 
//                 value="premium" 
//                 checked={accessType === 'premium'} 
//                 onChange={() => setAccessType('premium')} 
//               />
//               <label htmlFor="premium">Premium</label>
//             </div>
//           </div>
//         </div>

//         <div className="form-section">
//           <h3>Media Files</h3>
          
//           <div className="file-upload">
//             <label htmlFor="video">Video File</label>
//             <div className="file-input-container">
//               <span className="file-input-icon">📹</span>
//               <span className="file-input-text">
//                 {videoName ? 'Change video file' : 'Click to select video file'}
//               </span>
//               <input 
//                 type="file" 
//                 id="video"
//                 accept="video/*" 
//                 onChange={handleVideoChange} 
//                 required 
//               />
//             </div>
//             {videoName && <div className="file-name">{videoName}</div>}
//           </div>

//           <div className="file-upload">
//             <label htmlFor="thumbnail">Thumbnail Image</label>
//             <div className="file-input-container">
//               <span className="file-input-icon">🖼️</span>
//               <span className="file-input-text">
//                 {thumbnailName ? 'Change thumbnail image' : 'Click to select thumbnail image'}
//               </span>
//               <input 
//                 type="file" 
//                 id="thumbnail"
//                 accept="image/*" 
//                 onChange={handleThumbnailChange} 
//                 required 
//               />
//             </div>
//             {thumbnailName && <div className="file-name">{thumbnailName}</div>}
//           </div>
//         </div>

//         <button type="submit" disabled={uploading}>
//           {uploading ? (
//             <>
//               <span className="loading-spinner"></span>
//               Uploading...
//             </>
//           ) : 'Upload Video'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default VideoUploadForm;
import React, { useState, useEffect, useRef } from 'react';
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
  const [messageType, setMessageType] = useState('');
  const [videoName, setVideoName] = useState('');
  const [thumbnailName, setThumbnailName] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  const dropdownRef = useRef(null);

  const categories = ["Agriculture", "Soil", "Weather", "Pesticides", "Fertilizers"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoName(file.name);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailName(file.name);
    }
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setShowCategoryDropdown(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video || !thumbnail) {
      setMessage('Please select both a video and a thumbnail image.');
      setMessageType('error');
      return;
    }

    if (!category) {
      setMessage('Please select a category.');
      setMessageType('error');
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
      setMessageType('success');
      setUploading(false);
      
      // Reset form after successful upload
      setTitle('');
      setDescription('');
      setCategory('');
      setAccessType('basic');
      setVideo(null);
      setThumbnail(null);
      setVideoName('');
      setThumbnailName('');
    } catch (error) {
      setMessage('Upload failed. Try again.');
      setMessageType('error');
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleUpload}>
        <div className="form-section">
          <h3>Video Details</h3>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title"
            placeholder="Enter video title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          
          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            placeholder="Write a description for your video" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="category">Category</label>
          <div className="custom-dropdown" ref={dropdownRef}>
            <div 
              className="dropdown-selected"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              {category || "Select a category"}
              <span className="dropdown-arrow">▼</span>
            </div>
            {showCategoryDropdown && (
              <div className="dropdown-options">
                {categories.map((cat, index) => (
                  <div 
                    key={index} 
                    className="dropdown-option" 
                    onClick={() => handleCategorySelect(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
            <input 
              type="hidden" 
              id="category"
              name="category" 
              value={category} 
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Access Level</h3>
          <div className="radio-group">
            <div className="radio-option">
              <input 
                type="radio" 
                id="basic" 
                name="accessType" 
                value="basic" 
                checked={accessType === 'basic'} 
                onChange={() => setAccessType('basic')} 
              />
              <label htmlFor="basic">Basic</label>
            </div>
            
            <div className="radio-option">
              <input 
                type="radio" 
                id="standard" 
                name="accessType" 
                value="standard" 
                checked={accessType === 'standard'} 
                onChange={() => setAccessType('standard')} 
              />
              <label htmlFor="standard">Standard</label>
            </div>
            
            <div className="radio-option">
              <input 
                type="radio" 
                id="premium" 
                name="accessType" 
                value="premium" 
                checked={accessType === 'premium'} 
                onChange={() => setAccessType('premium')} 
              />
              <label htmlFor="premium">Premium</label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Media Files</h3>
          
          <div className="file-upload">
            <label htmlFor="video">Video File</label>
            <div className="file-input-container">
              <span className="file-input-icon">📹</span>
              <span className="file-input-text">
                {videoName ? 'Change video file' : 'Click to select video file'}
              </span>
              <input 
                type="file" 
                id="video"
                accept="video/*" 
                onChange={handleVideoChange} 
                required 
              />
            </div>
            {videoName && <div className="file-name">{videoName}</div>}
          </div>

          <div className="file-upload">
            <label htmlFor="thumbnail">Thumbnail Image</label>
            <div className="file-input-container">
              <span className="file-input-icon">🖼️</span>
              <span className="file-input-text">
                {thumbnailName ? 'Change thumbnail image' : 'Click to select thumbnail image'}
              </span>
              <input 
                type="file" 
                id="thumbnail"
                accept="image/*" 
                onChange={handleThumbnailChange} 
                required 
              />
            </div>
            {thumbnailName && <div className="file-name">{thumbnailName}</div>}
          </div>
        </div>

        <button type="submit" disabled={uploading}>
          {uploading ? (
            <>
              <span className="loading-spinner"></span>
              Uploading...
            </>
          ) : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;