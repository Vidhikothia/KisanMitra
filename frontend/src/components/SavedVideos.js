import React, { useState, useEffect } from "react";
import "./Videos.css"; // Reuse the same styling

const SavedVideos = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedVideos")) || [];
    setSavedVideos(saved);
  }, []);

  return (
    <div className="videos-page">
      <div className="videos-container">
        {savedVideos.length === 0 ? (
          <p>No saved videos</p>
        ) : (
          savedVideos.map((video) => (
            <div className="video-card" key={video._id}>
              <div className="thumbnail-overlay">
                <img
                  src={video.thumbnail_url || "default-thumbnail.jpg"}
                  alt="Thumbnail"
                  className="video-thumbnail"
                />
              </div>
              <div className="video-info">
                <h2 className="video-title">{video.content_id?.title || "Untitled Video"}</h2>
                <p className="video-description">{video.content_id?.description || "No description available."}</p>
                <p className="video-date">Uploaded: {new Date(video.content_id?.uploaded_date || 0).toLocaleDateString()}</p>
                <p className="video-meta">Category: {video.content_id?.category || "Uncategorized"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedVideos;
