import React, { useState, useEffect } from "react";
import "./Videos.css"; // Reuse the same styling

const SavedVideos = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedVideos")) || [];
    setSavedVideos(saved);

    // Analytics
    const categories = {};
    let latestDate = 0;
    let oldestDate = Date.now();
    const titles = [];

    saved.forEach((video) => {
      const { category, uploaded_date, title } = video.content_id || {};

      // Category Count
      if (category) {
        categories[category] = (categories[category] || 0) + 1;
      }

      // Date Check
      const date = new Date(uploaded_date).getTime();
      if (date > latestDate) latestDate = date;
      if (date < oldestDate) oldestDate = date;

      // Titles
      if (title) titles.push(title);
    });

    console.log("✅ Total Videos:", saved.length);
    console.log("📁 Category Breakdown:", categories);
    console.log("🏷️ Top Category:", Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0]);
    console.log("📅 Latest Upload:", new Date(latestDate).toLocaleDateString());
    console.log("⏳ Oldest Upload:", new Date(oldestDate).toLocaleDateString());
    console.log("🧾 Titles:", titles);
  }, []);

  return (
    <div className="videos-page">
      <h1 className="saved-heading">Saved Videos</h1> {/* 👈 New Heading */}
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
                <p className="video-date">
                  Uploaded: {new Date(video.content_id?.uploaded_date || 0).toLocaleDateString()}
                </p>
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
