"use client"

import { useEffect, useState, useRef } from "react"
import { FaSearch, FaHeart, FaBookmark, FaBell, FaBellSlash, FaPlay } from "react-icons/fa"
import axios from "axios"
import "./Videos.css"

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [subscribedEducators, setSubscribedEducators] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search for farming videos...")
  const videoRefs = useRef({})
  const searchSuggestions = [
    "Search for organic farming techniques...",
    "Find videos about soil conservation...",
    "Discover sustainable agriculture methods...",
    "Learn about crop rotation strategies...",
    "Explore natural pest control solutions...",
    "Search for water conservation in farming...",
  ]

  // Rotate search placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * searchSuggestions.length)
      setSearchPlaceholder(searchSuggestions[randomIndex])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Fetch videos and categories
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:5000/content/videos")
        const data = response.data

        // Sort videos by upload date (newest first)
        const sortedVideos = data.sort((a, b) => {
          const dateA = a.content_id?.uploaded_date ? new Date(a.content_id.uploaded_date) : new Date(0)
          const dateB = b.content_id?.uploaded_date ? new Date(b.content_id.uploaded_date) : new Date(0)
          return dateB - dateA
        })

        setVideos(sortedVideos)

        // Extract unique categories and add "All" at the beginning
        const uniqueCategories = ["all", ...new Set(data.map((video) => video.content_id?.category || "Uncategorized"))]
        setCategories(uniqueCategories)

        // Check subscription status for each educator
        const educators = [...new Set(data.map((video) => video.content_id?.creator?.user_id?._id).filter(Boolean))]

        // Fetch subscription status for each educator
        const subscriptionStatus = {}
        for (const educatorId of educators) {
          try {
            const response = await axios.get(`http://localhost:5000/auth/user/subscriptions/subscriptionOfUser/${educatorId}`, {
              withCredentials: true,
            })
            subscriptionStatus[educatorId] = response.data.isSubscribed
          } catch (error) {
            console.error("Error fetching subscription status:", error)
          }
        }

        setSubscribedEducators(subscriptionStatus)
      } catch (error) {
        console.error("Error fetching videos:", error)
        setError("Failed to load videos. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const handleLike = async (videoId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/content/videos/like/${videoId}`,
        {},
        {
          withCredentials: true,
        },
      )

      if (response.status === 200) {
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video._id === videoId ? { ...video, like_count: response.data.like_count || 0 } : video,
          ),
        )
      }
    } catch (error) {
      console.error("Error liking video:", error)
      alert("Please log in to like videos")
    }
  }

  const handleSave = async (videoId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/content/videos/save/${videoId}`,
        {},
        {
          withCredentials: true,
        },
      )

      if (response.status === 200) {
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video._id === videoId ? { ...video, saved_count: response.data.saved_count || 0 } : video,
          ),
        )
      }
    } catch (error) {
      console.error("Error saving video:", error)
      alert("Please log in to save videos")
    }
  }

  const handleSubscribe = async (educatorId) => {
    try {
      if (subscribedEducators[educatorId]) {
        // Unsubscribe
        const response = await axios.post(
          `http://localhost:5000/auth/user/subscriptions/unsubscribe/${educatorId}`,
          {},
          {
            withCredentials: true,
          },
        )

        if (response.status === 200) {
          setSubscribedEducators((prev) => ({
            ...prev,
            [educatorId]: false,
          }))
        }
      } else {
        // Subscribe
        const response = await axios.post(
          `http://localhost:5000/auth/user/subscriptions/subscribe/${educatorId}`,
          {},
          {
            withCredentials: true,
          },
        )

        if (response.status === 200) {
          setSubscribedEducators((prev) => ({
            ...prev,
            [educatorId]: true,
          }))
        }
      }
    } catch (error) {
      console.error("Error updating subscription:", error)
      alert("Please log in to subscribe to educators")
    }
  }

  const handleVideoClick = (videoId) => {
    // Navigate to video detail page
    window.location.href = `/fullvideo/${videoId}`
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  // Filter videos by selected category and search query
  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "all" || (video.content_id?.category || "Uncategorized") === selectedCategory

    const matchesSearch =
      !searchQuery ||
      video.content_id?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.content_id?.description?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

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
    <div className="videos-page">
      {/* Hero Search Section with Blurred Background */}
      <div className="hero-search-section">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="search-input-container">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-navigation">
        <div className="category-container">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-button ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="vedio-content-container">
        <div className="videos-grid">
          {filteredVideos.length === 0 ? (
            <div className="no-videos-message">
              <p>No videos found for the selected category.</p>
            </div>
          ) : (
            filteredVideos.map((video) => {
              const educatorId = video.content_id?.creator?.user_id?._id
              const isSubscribed = subscribedEducators[educatorId] || false

              return (
                <div className="video-video-card" key={video._id}>
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
                      {video.content_id?.description?.substring(0, 120) || "No description available."}
                      {video.content_id?.description?.length > 120 ? "..." : ""}
                    </p>

                    <div className="video-educator">
                      <span className="educator-name">
                        By: {video.content_id?.creator?.user_id?.username || "Unknown Educator"}
                      </span>
                    </div>

                    <div className="video-actions">
                      <button
                        className="action-button like-button"
                        onClick={() => handleLike(video._id)}
                        title="Like this video"
                      >
                        <FaHeart className="action-icon" />
                        <span className="action-count">{video.like_count || 0}</span>
                      </button>

                      <button
                        className="action-button save-button"
                        onClick={() => handleSave(video._id)}
                        title="Save this video"
                      >
                        <FaBookmark className="action-icon" />
                        <span className="action-count">{video.saved_count || 0}</span>
                      </button>

                      {educatorId && (
                        <button
                          className={`action-button subscribe-button ${isSubscribed ? "subscribed" : ""}`}
                          onClick={() => handleSubscribe(educatorId)}
                          title={isSubscribed ? "Unsubscribe from this educator" : "Subscribe to this educator"}
                        >
                          {isSubscribed ? (
                            <>
                              <FaBellSlash className="action-icon" />
                              <span>Subscribed</span>
                            </>
                          ) : (
                            <>
                              <FaBell className="action-icon" />
                              <span>Subscribe</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Videos

 