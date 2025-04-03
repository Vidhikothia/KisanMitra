"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from 'react-router-dom';
import "./ManageContent.css"
import { FaUpload, FaVideo, FaFileAlt, FaPlay, FaTimes, FaImage } from "react-icons/fa"
import axios from "axios"

const ManageContent = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("videos")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [videos, setVideos] = useState([])
  const [articles, setArticles] = useState([])
  const [loadingVideos, setLoadingVideos] = useState(true)
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [videoError, setVideoError] = useState(null)
  const [articleError, setArticleError] = useState(null)
  const [uploadType, setUploadType] = useState(activeTab === "videos" ? "video" : "article")

  // Form states for video upload
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [accessType, setAccessType] = useState("basic")
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [videoName, setVideoName] = useState("")
  const [thumbnailName, setThumbnailName] = useState("")
  const [uploading, setUploading] = useState(false)

  // Form states for article upload
  const [articleContent, setArticleContent] = useState("")
  const [articleImages, setArticleImages] = useState([])
  const [articleImageNames, setArticleImageNames] = useState([])

  // Dropdown state
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const categories = ["Agriculture", "Soil", "Weather", "Pesticides", "Fertilizers"]

  useEffect(() => {
    if (activeTab === "videos") {
      fetchVideos()
    } else {
      fetchArticles()
    }
  }, [activeTab])

  const fetchVideos = async () => {
    try {
      setLoadingVideos(true)
      const response = await axios.get("http://localhost:5000/content/videos/educators", { withCredentials: true })

      const data = response.data
      console.log("videos data =", response)

      // Sort videos by upload date (newest first)
      const sortedVideos = data.sort((a, b) => {
        const dateA = a.content_id?.uploaded_date ? new Date(a.content_id.uploaded_date) : new Date(0)
        const dateB = b.content_id?.uploaded_date ? new Date(b.content_id.uploaded_date) : new Date(0)
        return dateB - dateA
      })

      setVideos(sortedVideos)
      setVideoError(null)
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data || error.message)
      setVideoError(error.response?.data?.message || "Failed to fetch videos")
    } finally {
      setLoadingVideos(false)
    }
  }

  const fetchArticles = async () => {
    try {
      setLoadingArticles(true)
      const response = await axios.get("http://localhost:5000/content/articles/educators", { withCredentials: true })

      const data = response.data
      console.log("articles data =", response)

      // Sort articles by upload date (newest first)
      const sortedArticles = data.sort((a, b) => {
        const dateA = a.content_id?.uploaded_date ? new Date(a.content_id.uploaded_date) : new Date(0)
        const dateB = b.content_id?.uploaded_date ? new Date(b.content_id.uploaded_date) : new Date(0)
        return dateB - dateA
      })

      setArticles(sortedArticles)
      setArticleError(null)
    } catch (error) {
      console.error("Error fetching articles:", error.response?.data || error.message)
      setArticleError(error.response?.data?.message || "Failed to fetch articles")
    } finally {
      setLoadingArticles(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleVideoClick = (videoId) => {
    // Navigate to the full video page
    navigate(`/fullvideo/${videoId}`);
  };

  const handleArticleClick = (articleId) => {
    // Navigate to the full article page
    navigate(`/fullarticle/${articleId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory)
    setShowCategoryDropdown(false)
  }

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0])
      setVideoName(e.target.files[0].name)
    }
  }

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0])
      setThumbnailName(e.target.files[0].name)
    }
  }

  const handleArticleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Limit to 2 images
      const newImages = [...articleImages]
      const newImageNames = [...articleImageNames]

      for (let i = 0; i < Math.min(e.target.files.length, 2 - articleImages.length); i++) {
        newImages.push(e.target.files[i])
        newImageNames.push(e.target.files[i].name)
      }

      setArticleImages(newImages)
      setArticleImageNames(newImageNames)
    }
  }

  const removeArticleImage = (index) => {
    const newImages = [...articleImages]
    const newImageNames = [...articleImageNames]

    newImages.splice(index, 1)
    newImageNames.splice(index, 1)

    setArticleImages(newImages)
    setArticleImageNames(newImageNames)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      if (uploadType === "video") {
        console.log("Uploading video")
        console.log("Title:", title)
        console.log("Description:", description)
        console.log("Category:", category)
        console.log("Access Type:", accessType)
        console.log("Video File:", videoFile)
        console.log("Thumbnail File:", thumbnailFile)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("access_type", accessType)
        formData.append("category", category)
        formData.append("video", videoFile)
        formData.append("thumbnail", thumbnailFile)

        try {
          const response = await axios.post("http://localhost:5000/content/upload_video", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })

          // Reset form after successful upload
          setTitle("")
          setDescription("")
          setCategory("")
          setAccessType("basic")
          setVideoFile(null)
          setThumbnailFile(null)
          setVideoName("")
          setThumbnailName("")
          alert("Video uploaded successfully!")

          // Refresh the videos list
          fetchVideos()
        } catch (error) {
          alert("Failed to upload video. Please try again.")
          console.error("error from video upload ", error.message)
        }
      } else {
        console.log("Uploading article")
        console.log("Title:", title)
        console.log("Description:", description)
        console.log("Category:", category)
        console.log("Article Content:", articleContent)
        console.log("Article Images:", articleImages)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("content", articleContent)

        articleImages.forEach((file) => {
          formData.append("articlephoto", file) // 'articlephoto' should match backend field name
        })

        try {
          const response = await axios.post("http://localhost:5000/content/upload_article", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })

          // Reset form after successful upload
          setTitle("")
          setDescription("")
          setCategory("")
          setArticleContent("")
          setArticleImages([])
          setArticleImageNames([])
          alert("Article uploaded successfully!")

          // Refresh the articles list
          fetchArticles()
        } catch (error) {
          alert("Failed to upload Article. Please try again.")
          console.error("error from Article upload ", error.message)
        }
      }

      setShowUploadForm(false)
    } catch (error) {
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setCategory("")
    setAccessType("basic")
    setVideoFile(null)
    setThumbnailFile(null)
    setVideoName("")
    setThumbnailName("")
    setArticleContent("")
    setArticleImages([])
    setArticleImageNames([])
  }

  return (
    <div className="manage-content-page">
      <div className="content-header">
        <div className="header-top">
          <h1>Manage Content</h1>
          <p className="header-subtitle">Organize and manage your farming educational resources</p>
        </div>

        <div className="header-tabs">
          <button
            className={`content-tab-btn ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("videos")
              setShowUploadForm(false)
              setUploadType("video")
            }}
          >
            <FaVideo className="tab-icon" /> Videos
          </button>
          <button
            className={`content-tab-btn ${activeTab === "articles" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("articles")
              setShowUploadForm(false)
              setUploadType("article")
            }}
          >
            <FaFileAlt className="tab-icon" /> Articles
          </button>
          <div className="header-right">
            <button
              className="content-upload-btn"
              onClick={() => {
                setShowUploadForm(!showUploadForm)
                setUploadType(activeTab === "videos" ? "video" : "article")
                resetForm()
              }}
            >
              <FaUpload className="btn-icon" /> Upload {activeTab === "videos" ? "Video" : "Article"}
            </button>
          </div>
        </div>
      </div>

      <div className="content-body">
        {activeTab === "videos" ? (
          <>
            {loadingVideos ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading videos...</p>
              </div>
            ) : videoError ? (
              <div className="error-message">
                <p>Error: {videoError}</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="empty-content-state">
                <FaVideo className="empty-icon" />
                <h3>No videos available yet</h3>
                <p>Start uploading videos to share farming knowledge</p>
              </div>
            ) : (
              <div className="videos-container">
                {videos.map((video) => (
                  <div className="video-card" key={video._id} onClick={() => handleVideoClick(video._id)}>
                    <div className="thumbnail-overlay">
                      <img
                        src={video.thumbnail_url || "https://via.placeholder.com/320x180?text=Video+Thumbnail"}
                        alt="Thumbnail"
                        className="video-thumbnail"
                      />
                      <div className="play-button">
                        <FaPlay />
                      </div>
                    </div>

                    <div className="video-info">
                      <h2 className="video-title">{video.content_id?.title || "Untitled Video"}</h2>
                      <p className="video-date">{formatDate(video.content_id?.uploaded_date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {loadingArticles ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading articles...</p>
              </div>
            ) : articleError ? (
              <div className="error-message">
                <p>Error: {articleError}</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="empty-content-state">
                <FaFileAlt className="empty-icon" />
                <h3>No articles available yet</h3>
                <p>Start uploading articles to share farming knowledge</p>
              </div>
            ) : (
              <div className="articles-container">
                {articles.map((article) => (
                  <div className="article-card" key={article._id} onClick={() => handleArticleClick(article._id)}>
                    <div className="article-image-container">
                      <img
                        src={article.images?.[0] || "https://via.placeholder.com/320x180?text=Article+Image"}
                        alt="Article"
                        className="article-image"
                      />
                    </div>

                    <div className="article-content">
                      <div className="article-meta">
                        <span className="article-category">{article.content_id?.category || "FARMING"}</span>
                        <span className="article-read-time">5min Read</span>
                      </div>

                      <h2 className="article-title">{article.content_id?.title || "Untitled Article"}</h2>

                      <p className="article-excerpt">
                        {article.content_id?.description ||
                          "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                      </p>

                      <button className="read-article-btn">Read full article</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showUploadForm && (
        <div className="upload-modal-overlay">
          <div className="upload-modal">
            <div className="modal-header">
              <h2>Upload {uploadType === "video" ? "Video" : "Article"}</h2>
              <button className="content-close-btn" onClick={() => setShowUploadForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-body upload-form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Basic Information</h3>

                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      placeholder="Write a description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <div className="custom-dropdown" ref={dropdownRef}>
                      <div className="dropdown-selected" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                        {category || "Select a category"}
                        <span className="dropdown-arrow">▼</span>
                      </div>
                      {showCategoryDropdown && (
                        <div className="dropdown-options">
                          {categories.map((cat, index) => (
                            <div key={index} className="dropdown-option" onClick={() => handleCategorySelect(cat)}>
                              {cat}
                            </div>
                          ))}
                        </div>
                      )}
                      <input type="hidden" id="category" name="category" value={category} required />
                    </div>
                  </div>
                </div>

                {uploadType === "video" ? (
                  <>
                    <div className="form-section">
                      <h3>Access Level</h3>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="basic"
                            name="accessType"
                            value="basic"
                            checked={accessType === "basic"}
                            onChange={() => setAccessType("basic")}
                          />
                          <label htmlFor="basic">Basic</label>
                        </div>

                        <div className="radio-option">
                          <input
                            type="radio"
                            id="standard"
                            name="accessType"
                            value="standard"
                            checked={accessType === "standard"}
                            onChange={() => setAccessType("standard")}
                          />
                          <label htmlFor="standard">Standard</label>
                        </div>

                        <div className="radio-option">
                          <input
                            type="radio"
                            id="premium"
                            name="accessType"
                            value="premium"
                            checked={accessType === "premium"}
                            onChange={() => setAccessType("premium")}
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
                            {videoName ? "Change video file" : "Click to select video file"}
                          </span>
                          <input type="file" id="video" accept="video/*" onChange={handleVideoChange} required />
                        </div>
                        {videoName && <div className="file-name">{videoName}</div>}
                      </div>

                      <div className="file-upload">
                        <label htmlFor="thumbnail">Thumbnail Image</label>
                        <div className="file-input-container">
                          <span className="file-input-icon">🖼️</span>
                          <span className="file-input-text">
                            {thumbnailName ? "Change thumbnail image" : "Click to select thumbnail image"}
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
                  </>
                ) : (
                  <>
                    <div className="form-section">
                      <h3>Article Content</h3>
                      <div className="form-group">
                        <label htmlFor="articleContent">Content (up to 500 words)</label>
                        <textarea
                          id="articleContent"
                          className="article-content-textarea"
                          placeholder="Write your article content here (up to 500 words)"
                          value={articleContent}
                          onChange={(e) => setArticleContent(e.target.value)}
                          required
                        ></textarea>
                        <div className="word-count">
                          {articleContent.split(/\s+/).filter(Boolean).length} / 500 words
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Article Images (Max 2)</h3>
                      <div className="file-upload">
                        <label htmlFor="articleImages">Upload Images</label>
                        <div className="file-input-container">
                          <span className="file-input-icon">
                            <FaImage />
                          </span>
                          <span className="file-input-text">
                            {articleImages.length === 0
                              ? "Click to select images"
                              : articleImages.length === 2
                                ? "Maximum images reached"
                                : "Add another image"}
                          </span>
                          <input
                            type="file"
                            id="articleImages"
                            accept="image/*"
                            onChange={handleArticleImageChange}
                            disabled={articleImages.length >= 2}
                            multiple={articleImages.length < 1}
                          />
                        </div>

                        {articleImageNames.length > 0 && (
                          <div className="selected-images">
                            {articleImageNames.map((name, index) => (
                              <div key={index} className="selected-image-item">
                                <span className="image-name">{name}</span>
                                <button
                                  type="button"
                                  className="remove-image-btn"
                                  onClick={() => removeArticleImage(index)}
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="form-actions">
                  <button type="button" className="content-cancel-btn" onClick={() => setShowUploadForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="content-upload-btn" disabled={uploading}>
                    {uploading ? (
                      <>
                        <span className="loading-spinner-small"></span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="btn-icon" /> Upload
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageContent

