import React, { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Farmer",
    feedbackType: "Content",
    rating: 5,
    comments: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          role: "Farmer",
          feedbackType: "Content",
          rating: 5,
          comments: "",
        });
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Kisan Mitra Feedback Form</h2>
      {submitted ? (
        <p style={styles.successMessage}>Thank you for your feedback! 🌟</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />

          <label style={styles.label}>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} style={styles.select}>
            <option value="Farmer">Farmer</option>
            <option value="Educator">Educator</option>
            <option value="Admin">Admin</option>
          </select>

          <label style={styles.label}>Feedback Type:</label>
          <select name="feedbackType" value={formData.feedbackType} onChange={handleChange} style={styles.select}>
            <option value="Content">Content</option>
            <option value="Educator">Educator</option>
            <option value="Platform">Platform</option>
          </select>

          <label style={styles.label}>Rating:</label>
          <input type="range" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} style={styles.range} />
          <span>{formData.rating} ⭐</span>

          <label style={styles.label}>Comments:</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange} rows="4" required style={styles.textarea} />

          <button type="submit" style={styles.button}>Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: { maxWidth: "500px", margin: "auto", padding: "20px", background: "#f9f9f9", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" },
  heading: { textAlign: "center", color: "#004aad" },
  form: { display: "flex", flexDirection: "column" },
  label: { marginTop: "10px", fontWeight: "bold" },
  input: { padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" },
  select: { padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" },
  range: { marginTop: "5px", width: "100%" },
  textarea: { padding: "8px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px" },
  button: { marginTop: "15px", padding: "10px", background: "#004aad", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  successMessage: { textAlign: "center", color: "green", fontWeight: "bold" },
};

export default FeedbackForm;
