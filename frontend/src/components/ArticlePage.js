import React from "react";

const ArticlePage = () => {
  const articles = [
    {
      title: "The Future of Sustainable Farming",
      description:
        "Learn about sustainable farming practices that are revolutionizing agriculture and ensuring food security for future generations.",
      link: "https://www.nationalgeographic.com/environment/article/sustainable-agriculture",
      color: "#FF9E7D", // Coral
      icon: "🌱"
    },
    {
      title: "Top 10 Crops for Profitable Farming",
      description:
        "Discover the top 10 crops that are highly profitable and ideal for both small-scale and large-scale farmers.",
      link: "https://www.agriculture.com/crops/top-10-most-profitable-crops-to-grow",
      color: "#AEDD94", // Light Green
      icon: "💰"
    },
    {
      title: "Organic vs. Conventional Farming",
      description:
        "Explore the pros and cons of organic and conventional farming methods and their impact on the environment.",
      link: "https://www.organicvalley.coop/organic-vs-conventional/",
      color: "#FFD166", // Yellow
      icon: "⚖️"
    },
    {
      title: "Modern Agricultural Technologies",
      description:
        "Dive into the latest technologies like drones, IoT, and AI that are transforming the agricultural landscape.",
      link: "https://www.theguardian.com/environment/2020/aug/04/farming-drones-and-ai-could-revolutionize-agriculture",
      color: "#85C7F2", // Light Blue
      icon: "🤖"
    },
    {
      title: "Soil Health: Tips and Tricks",
      description:
        "Understand the importance of soil health and get actionable tips to enhance soil fertility on your farm.",
      link: "https://www.soils.org/discover-soils/what-is-soil/soil-health",
      color: "#B18F6A", // Brown
      icon: "🌿"
    },
  ];

  const styles = {
    container: {
      fontFamily: "'Roboto', sans-serif",
      backgroundImage: "linear-gradient(to bottom, #dcfce7, #dbeafe)",
      minHeight: "100vh",
    },
    heroSection: {
      padding: "64px 16px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    bubble1: {
      position: "absolute",
      top: "-64px",
      left: "-64px",
      width: "128px",
      height: "128px",
      backgroundColor: "#fde047",
      borderRadius: "50%",
      opacity: "0.5",
      animation: "pulse 2s infinite",
    },
    bubble2: {
      position: "absolute",
      top: "32px",
      right: "32px",
      width: "96px",
      height: "96px",
      backgroundColor: "#86efac",
      borderRadius: "50%",
      opacity: "0.6",
      animation: "bounce 2s infinite",
    },
    bubble3: {
      position: "absolute",
      bottom: "0",
      left: "25%",
      width: "80px",
      height: "80px",
      backgroundColor: "#93c5fd",
      borderRadius: "50%",
      opacity: "0.4",
      animation: "pulse 3s infinite",
    },
    heroTitle: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#166534",
      marginBottom: "16px",
      position: "relative",
      zIndex: "10",
    },
    emojiSpan: {
      display: "inline-block",
      transition: "transform 0.3s",
    },
    heroSubtitle: {
      fontSize: "1.25rem",
      color: "#15803d",
      maxWidth: "42rem",
      margin: "0 auto",
      position: "relative",
      zIndex: "10",
    },
    articlesGrid: {
      maxWidth: "1152px",
      margin: "0 auto",
      padding: "0 16px 64px 16px",
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "32px",
    },
    articleCard: {
      borderRadius: "12px",
      overflow: "hidden",
      transition: "all 0.3s",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    },
    cardContent: {
      padding: "24px",
      position: "relative",
    },
    icon: {
      fontSize: "3rem",
      marginBottom: "16px",
      textAlign: "center",
    },
    articleTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "16px",
      textAlign: "center",
    },
    articleDescription: {
      fontSize: "1.125rem",
      marginBottom: "24px",
    },
    linkContainer: {
      textAlign: "center",
    },
    readMoreLink: {
      display: "inline-block",
      backgroundColor: "white",
      padding: "12px 24px",
      borderRadius: "9999px",
      fontWeight: "bold",
      textDecoration: "none",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s",
    },
    decorDot1: {
      position: "absolute",
      top: "8px",
      right: "8px",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "white",
      opacity: "0.3",
    },
    decorDot2: {
      position: "absolute",
      bottom: "8px",
      left: "8px",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      backgroundColor: "white",
      opacity: "0.2",
    },
    footer: {
      textAlign: "center",
      paddingBottom: "24px",
      color: "#166534",
    },
    footerText: {
      fontSize: "1.125rem",
    },
    "@keyframes pulse": {
      "0%, 100%": { opacity: "0.5" },
      "50%": { opacity: "0.8" },
    },
    "@keyframes bounce": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-20px)" },
    },
  };

  // Add media query for responsive grid
  const mediaQueryStyle = `
    @media (min-width: 768px) {
      .articles-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .articles-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.8; }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    .article-card:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    .read-more-link:hover {
      transform: rotate(2deg) scale(1.1);
    }
    .emoji-span:hover {
      transform: rotate(6deg);
    }
  `;

  return (
    <div style={styles.container}>
      {/* Add the style tag for animations and media queries */}
      <style dangerouslySetInnerHTML={{ __html: mediaQueryStyle }} />
      
      {/* Hero Section with playful design */}
      <section style={styles.heroSection}>
        <div style={styles.bubble1}></div>
        <div style={styles.bubble2}></div>
        <div style={styles.bubble3}></div>
        
        <h1 style={styles.heroTitle}>
          <span> Grow </span>
          <span> & </span>
          <span> Learn </span>
        </h1>
        
        <p style={styles.heroSubtitle}>
          Fun farming facts and fantastic agricultural adventures await!
        </p>
      </section>

      {/* Playful Articles Grid */}
      <div className="articles-grid" style={styles.articlesGrid}>
        {articles.map((article, index) => (
          <div 
            key={index} 
            className="article-card"
            style={{
              ...styles.articleCard,
              backgroundColor: article.color,
            }}
          >
            <div style={styles.cardContent}>
              <div style={styles.icon}>
                {article.icon}
              </div>
              <h3 style={styles.articleTitle}>
                {article.title}
              </h3>
              <p style={styles.articleDescription}>
                {article.description}
              </p>
              <div style={styles.linkContainer}>
                <a 
                  href={article.link} 
                  className="read-more-link"
                  style={{
                    ...styles.readMoreLink,
                    color: article.color,
                  }}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Dig In! 🌱
                </a>
              </div>
              
              {/* Decorative elements */}
              <div style={styles.decorDot1}></div>
              <div style={styles.decorDot2}></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Fun footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>Keep Growing! 🌱 🌿 🌾</p>
      </footer>
    </div>
  );
};

export default ArticlePage;