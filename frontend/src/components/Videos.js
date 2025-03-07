import React, { useEffect, useState, useRef } from "react";
import "./Videos.css"; // Importing updated CSS

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRefs = useRef({}); // Storing video refs to control fullscreen

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/content/videos");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleFullScreen = (videoId) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
      video.play();
    }
  };

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="videos-page">
      <div className="videos-container">
        {videos.map((video) => (
          <div
            className="video-card"
            key={video._id}
            onClick={() => handleFullScreen(video._id)} // Click to full screen
          >
            {/* Thumbnail Overlay */}
            <div className="thumbnail-overlay">
              <img
                src={video.thumbnail_url || "default-thumbnail.jpg"}
                alt="Thumbnail"
                className="video-thumbnail"
              />
              <div className="play-button">▶</div>
            </div>

            {/* Video */}
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

                <div className="video-actions">
                  <button className="like-btn">👍 Like</button>
                  <button className="share-btn">🔗 Share</button>
                  <button className="more-btn">⋮ More</button>
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
