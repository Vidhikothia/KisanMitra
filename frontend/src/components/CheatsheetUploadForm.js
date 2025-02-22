import React, { useState } from "react";
import "./UploadForms.css";

// Cheatsheet Category Component
const CheatsheetCategorySelect = ({ setCategory }) => {
  return (
    <div className="category-select">
      <label htmlFor="cheatsheet-category">Category:</label>
      <select id="cheatsheet-category" onChange={(e) => setCategory(e.target.value)}>
        <option value="Programming">Programming</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="Engineering">Engineering</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

// Main Cheatsheet Upload Form
const CheatsheetUploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const response = await fetch("/api/upload-cheatsheet", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Cheatsheet uploaded successfully");
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
      <h2>Upload Cheatsheet</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <CheatsheetCategorySelect setCategory={setCategory} />

        <div className="input-group">
          <label htmlFor="file">Upload File:</label>
          <input type="file" id="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} required />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default CheatsheetUploadForm;
