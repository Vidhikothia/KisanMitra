import React from "react";
import "./Navbar.css";

const ArticlePage = () => {
  const articles = [
    {
      title: "The Future of Sustainable Farming",
      description:
        "Learn about sustainable farming practices that are revolutionizing agriculture and ensuring food security for future generations.",
      link: "https://www.nationalgeographic.com/environment/article/sustainable-agriculture", // Link to actual article
    },
    {
      title: "Top 10 Crops for Profitable Farming",
      description:
        "Discover the top 10 crops that are highly profitable and ideal for both small-scale and large-scale farmers.",
      link: "https://www.agriculture.com/crops/top-10-most-profitable-crops-to-grow", // Link to actual article
    },
    {
      title: "Organic vs. Conventional Farming",
      description:
        "Explore the pros and cons of organic and conventional farming methods and their impact on the environment.",
      link: "https://www.organicvalley.coop/organic-vs-conventional/", // Link to actual article
    },
    {
      title: "Modern Agricultural Technologies",
      description:
        "Dive into the latest technologies like drones, IoT, and AI that are transforming the agricultural landscape.",
      link: "https://www.theguardian.com/environment/2020/aug/04/farming-drones-and-ai-could-revolutionize-agriculture", // Link to actual article
    },
    {
      title: "Soil Health: Tips and Tricks",
      description:
        "Understand the importance of soil health and get actionable tips to enhance soil fertility on your farm.",
      link: "https://www.soils.org/discover-soils/what-is-soil/soil-health", // Link to actual article
    },
  ];

  return (
    <div style={styles.container}>
      {/* Navbar */}
      

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Explore the World of Agriculture</h1>
        <p style={styles.heroSubtitle}>
          Insights, tips, and trends to inspire and empower modern farmers.
        </p>
      </section>

      {/* Articles Grid */}
      <div style={styles.articlesGrid}>
        {articles.map((article, index) => (
          <div key={index} style={styles.articleCard}>
            {/* <img
              src={article.image}
              alt={article.title}
              style={styles.articleImage}
            /> */}
            <h3 style={styles.articleTitle}>{article.title}</h3>
            <p style={styles.articleDescription}>{article.description}</p>
            <a href={article.link} style={styles.readMoreLink} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#d9f2d9",
    minHeight: "100vh",
  },
  heroSection: {
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#d9f2d9",
  },
  heroTitle: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
  articlesGrid: {
    display: "block",
    padding: "20px",
  },
  articleCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    textAlign: "center",
    padding: "20px",
    marginBottom:"20px",
  },
  articleImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginBottom: "15px",
  },
  articleTitle: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  articleDescription: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "15px",
  },
  readMoreLink: {
    color: "#007BFF",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "bold",
  },
};

export default ArticlePage;
