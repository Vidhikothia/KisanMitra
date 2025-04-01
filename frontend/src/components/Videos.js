import React, { useEffect, useState, useRef } from "react";
import "./Videos.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/content/videos");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data);
        
        // Extract unique categories from videos
        const uniqueCategories = [...new Set(data.map(video => 
          video.content_id?.category || "Uncategorized"
        ))];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleVideoClick = (videoId, event) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the card
    const video = videoRefs.current[videoId];
    
    if (video) {
      // Make the video visible before attempting fullscreen
      video.style.display = "block";
      
      // Start playing the video
      video.play()
        .then(() => {
          // Request fullscreen after play has started
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
        })
        .catch(err => {
          console.error("Error playing video:", err);
        });
    }
  };

  // Handle exiting fullscreen
  const handleFullscreenChange = (videoId) => {
    const video = videoRefs.current[videoId];
    if (video && !(document.fullscreenElement || 
                   document.webkitFullscreenElement || 
                   document.mozFullScreenElement || 
                   document.msFullscreenElement)) {
      // Hide the video when exiting fullscreen
      video.style.display = "none";
      video.pause();
    }
  };

  useEffect(() => {
    // Add fullscreenchange event listeners
    const fullscreenChangeEvents = [
      'fullscreenchange',
      'webkitfullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange'
    ];

    // Add listeners for all video elements
    videos.forEach(video => {
      const videoElement = videoRefs.current[video._id];
      if (videoElement) {
        fullscreenChangeEvents.forEach(eventName => {
          videoElement.addEventListener(eventName, () => handleFullscreenChange(video._id));
        });
      }
    });

    // Clean up event listeners
    return () => {
      videos.forEach(video => {
        const videoElement = videoRefs.current[video._id];
        if (videoElement) {
          fullscreenChangeEvents.forEach(eventName => {
            videoElement.removeEventListener(eventName, () => handleFullscreenChange(video._id));
          });
        }
      });
    };
  }, [videos]);

  // Filter videos by selected category
  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => 
        (video.content_id?.category || "Uncategorized") === selectedCategory
      );

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="videos-page">
      {/* <div className="category-filter">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-selector"
        >
          <option value="all">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div> */}
      
      <div className="videos-container">
        {filteredVideos.map((video) => (
          <div className="video-card" key={video._id}>
            {/* Thumbnail Overlay */}
            <div 
              className="thumbnail-overlay"
              onClick={(e) => handleVideoClick(video._id, e)}
            >
              <img
                src={video.thumbnail_url || "default-thumbnail.jpg"}
                alt="Thumbnail"
                className="video-thumbnail"
              />
              <div className="play-button">▶</div>
            </div>
            
            {/* Video - hidden by default via CSS */}
            <video
              ref={(el) => (videoRefs.current[video._id] = el)}
              className="video-player"
              controls
            >
              <source src={video.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Info */}
            <div className="video-info">
              <h2 className="video-title">{video.content_id?.title || "Untitled Video"}</h2>
              <p className="video-description">
                {video.content_id?.description || "No description available."}
              </p>
              {/* Video Meta & Actions */}
              <div className="video-meta">
                <p className="video-date">
                  Uploaded:{" "}
                  {video.content_id?.uploaded_date
                    ? new Date(video.content_id.uploaded_date).toLocaleDateString()
                    : "Unknown"}
                </p>
                <p className="video-educator">Educator: {video.content_id?.creator?.user_id?.username}</p>
                <p className="video-category">Category: {video.content_id?.category || "Uncategorized"}</p>
                <div className="video-actions">
                  <button className="like-btn">👍 Like</button>
                  <button className="share-btn">🚀 Share</button>
                  <button className="more-btn">ℹ More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;