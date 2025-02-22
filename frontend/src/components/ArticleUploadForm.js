import React, { useState } from "react";
import "./UploadForms.css";

// Article Category Component
const ArticleCategorySelect = ({ setCategory }) => {
  return (
    <div className="category-select">
      <label htmlFor="article-category">Category:</label>
      <select id="article-category" onChange={(e) => setCategory(e.target.value)}>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Education">Education</option>
        <option value="Business">Business</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

// Main Article Upload Form
const ArticleUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = { title, description, content, category };

    try {
      const response = await fetch("/api/upload-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        alert("Article uploaded successfully");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("An error occurred");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <ArticleCategorySelect setCategory={setCategory} />

        <div className="input-group">
          <label htmlFor="content">Article Content:</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ArticleUploadForm;
