import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Videos.css";

const VideoCards = () => {
  const [videos, setVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState([]); // State for videos to display

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setVisibleVideos(data.slice(0, 3));  // Display only 3 videos
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleVideoClick = (videoId, event) => {
    event.stopPropagation();
    const video = videoRefs.current[videoId];

    if (video) {
      video.style.display = "block";
      video.play()
        .then(() => {
          if (video.requestFullscreen) video.requestFullscreen();
        })
        .catch(err => console.error("Error playing video:", err));
    }
  };

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
    <div className="videos-page">
      <div className="videos-container">
        {visibleVideos.map((video) => (
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
              <p className="video-description">
                {video.content_id?.description || "No description available."}
              </p>
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
                  <button className="share-btn">🚀 Share</button>
                  <button className="more-btn">ℹ More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="view-more">
  <Link to="/videos">
    <p>View More</p>
  </Link>
</div>

    </div>
  );
};

export default VideoCards;
