import React, { useEffect, useState, useRef } from "react";
import "./Videos.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const videoRefs = useRef({});
  const [subscribedVideos, setSubscribedVideos] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/content/videos");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setVideos(data);

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

  const handleLike = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:5000/content/videos/like/${videoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();

      if (response.ok) {
        setVideos(prev =>
          prev.map(video =>
            video._id === videoId ? { ...video, like_count: data.like_count || 0 } : video
          )
        );
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error liking video:", error);
    }
  };

  const handleSave = async (video) => {
    try {
      const response = await fetch(`http://localhost:5000/content/videos/save/${video._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();

      if (response.ok) {
        setVideos(prev =>
          prev.map(v =>
            v._id === video._id ? { ...v, saved_count: data.saved_count || 0 } : v
          )
        );

        const savedVideos = JSON.parse(localStorage.getItem("savedVideos")) || [];
        if (!savedVideos.some(v => v._id === video._id)) {
          const updatedSavedVideos = [...savedVideos, video];
          localStorage.setItem("savedVideos", JSON.stringify(updatedSavedVideos));
        }
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error saving video:", error);
    }
  };

  const handleSubscribe = (videoId) => {
    setSubscribedVideos(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const handleVideoClick = (videoId, event) => {
    event.stopPropagation();
    const video = videoRefs.current[videoId];
    if (video) {
      video.style.display = "block";
      video.play().then(() => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      }).catch(err => {
        console.error("Error playing video:", err);
      });
    }
  };

  const handleFullscreenChange = (videoId) => {
    const video = videoRefs.current[videoId];
    if (video && !(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    )) {
      video.style.display = "none";
      video.pause();
    }
  };

  useEffect(() => {
    const fullscreenEvents = [
      'fullscreenchange', 'webkitfullscreenchange',
      'mozfullscreenchange', 'MSFullscreenChange'
    ];

    videos.forEach(video => {
      const videoElement = videoRefs.current[video._id];
      if (videoElement) {
        fullscreenEvents.forEach(eventName => {
          videoElement.addEventListener(eventName, () => handleFullscreenChange(video._id));
        });
      }
    });

    return () => {
      videos.forEach(video => {
        const videoElement = videoRefs.current[video._id];
        if (videoElement) {
          fullscreenEvents.forEach(eventName => {
            videoElement.removeEventListener(eventName, () => handleFullscreenChange(video._id));
          });
        }
      });
    };
  }, [videos]);

  const filteredVideos = [...videos]
    .filter(video => selectedCategory === "all" ||
      (video.content_id?.category || "Uncategorized") === selectedCategory)
    .sort((a, b) =>
      new Date(b.content_id?.uploaded_date || 0) - new Date(a.content_id?.uploaded_date || 0)
    );

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalLikes = videos.reduce((sum, video) => sum + (video.like_count || 0), 0);
  const totalSaves = videos.reduce((sum, video) => sum + (video.saved_count || 0), 0);

  return (
    <div className="videos-page">
      {/* Summary Section */}
      {/* <div className="video-summary">
        <h2>📊 Engagement Summary</h2>
        <p><strong>Total Likes:</strong> ❤️ {totalLikes}</p>
        <p><strong>Total Saves:</strong> 💾 {totalSaves}</p>
      </div> */}

      

      {/* Video Cards */}
      <div className="videos-container">
        {filteredVideos.map((video) => (
          <div className="video-card" key={video._id}>
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

            <video
              ref={(el) => (videoRefs.current[video._id] = el)}
              className="video-player"
              controls
            >
              <source src={video.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="video-info">
              <h2 className="video-title">{video.content_id?.title || "Untitled Video"}</h2>
              <p className="video-description">{video.content_id?.description || "No description available."}</p>
              <div className="video-meta">
                <p>Uploaded: {video.content_id?.uploaded_date
                    ? new Date(video.content_id.uploaded_date).toLocaleDateString()
                    : "Unknown"}</p>
                <p>Educator: {video.content_id?.creator?.user_id?.username}</p>
                <p>Category: {video.content_id?.category || "Uncategorized"}</p>
                <div className="video-actions">
                  <button className="like-btn" onClick={() => handleLike(video._id)}>
                    ❤️ Like ({video.like_count || 0})
                  </button>
                  <button className="save-btn" onClick={() => handleSave(video)}>
                    💾 Save ({video.saved_count || 0})
                  </button>
                  <button
                    className={`subscribe-btn ${subscribedVideos[video._id] ? "subscribed" : ""}`}
                    onClick={() => handleSubscribe(video._id)}
                  >
                    {subscribedVideos[video._id] ? "📤 Unsubscribe" : "📩 Subscribe"}
                  </button>
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