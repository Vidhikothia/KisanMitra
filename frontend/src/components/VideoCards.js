"use client"

import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { FaPlay, FaArrowRight } from "react-icons/fa"
import "./VideoCards.css"

const VideoCards = () => {
  const [videos, setVideos] = useState([])
  const [visibleVideos, setVisibleVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const videoRefs = useRef({})

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/content/videos")
        if (!response.ok) {
          throw new Error("Failed to fetch videos")
        }
        const data = await response.json()

        // Sort videos by upload date (newest first)
        const sortedVideos = data.sort((a, b) => {
          const dateA = a.content_id?.uploaded_date ? new Date(a.content_id.uploaded_date) : new Date(0)
          const dateB = b.content_id?.uploaded_date ? new Date(b.content_id.uploaded_date) : new Date(0)
          return dateB - dateA
        })

        setVideos(sortedVideos)
        setVisibleVideos(sortedVideos.slice(0, 6)) // Display only 6 videos
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const handleVideoClick = (videoId) => {
    // Navigate to video detail page
    window.location.href = `/fullvideo/${videoId}`
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading videos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    )
  }

  return (
    <div className="featured-videos-section">
      <div className="section-header">
        <h2 className="section-title">Featured Videos</h2>
        <Link to="/videos" className="view-more-link">
          <span>View All</span>
          <div className="view-more-arrow">
            <FaArrowRight />
          </div>
        </Link>
      </div>

      <div className="featured-videos-container">
        {visibleVideos.map((video) => (
          <div className="video-card" key={video._id}>
            <div className="video-thumbnail-container" onClick={() => handleVideoClick(video._id)}>
              <img
                src={video.thumbnail_url || "https://via.placeholder.com/320x180?text=Video+Thumbnail"}
                alt={video.content_id?.title || "Video thumbnail"}
                className="video-thumbnail"
              />
              <div className="play-overlay">
                <FaPlay className="play-icon" />
              </div>
            </div>

            <div className="video-content">
              <h3 className="video-title" onClick={() => handleVideoClick(video._id)}>
                {video.content_id?.title || "Untitled Video"}
              </h3>

              <div className="video-meta">
                <span className="video-category">{video.content_id?.category || "Uncategorized"}</span>
                <span className="video-date">{formatDate(video.content_id?.uploaded_date)}</span>
              </div>

              <p className="video-description">
                {video.content_id?.description?.substring(0, 80) || "No description available."}
                {video.content_id?.description?.length > 80 ? "..." : ""}
              </p>

              <div className="video-educator">
                <span className="educator-name">
                  By: {video.content_id?.creator?.user_id?.username || "Unknown Educator"}
                </span>
              </div>
            </div>
          </div>
        ))}
       
           {/* <div className="featured-videos-section">
            <div className="section-header"> */}
              
              {/* <Link to="/videos" className="view-more-link">
                <span>View All</span>
                <div className="view-more-arrow">
                  <FaArrowRight />
                </div>
              </Link> */}
            {/* </div>
            </div> */}
          </div>
    </div>
  )
}

export default VideoCards

