import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogout = () => {
    navigate("/");
  };

  const navigateTo = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "user-stats":
        return <UserStatsContent />;
      case "educator-stats":
        return <EducatorStatsContent />;
      case "feedback":
        return <FeedbackContent />;
      case "content-uploads":
        return <ContentUploadsContent />;
      case "content-category":
        return <ContentCategoryContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logoText}>Kisan Mitra</h2>

        <nav style={styles.navigation}>
          <div style={getNavItemStyle("dashboard", activeSection)} onClick={() => navigateTo("dashboard")}>
            📊 Dashboard
          </div>
          <div style={getNavItemStyle("educator-stats", activeSection)} onClick={() => navigateTo("educator-stats")}>
            👨‍🏫 Educator Stats
          </div>
          
          <div style={getNavItemStyle("content-uploads", activeSection)} onClick={() => navigateTo("content-uploads")}>
            📤 Content Uploads
          </div>
          <div style={getNavItemStyle("content-category", activeSection)} onClick={() => navigateTo("content-category")}>
            📚 Content Category
          </div>
          <div style={styles.navDivider}></div>
          <div style={styles.navItem} onClick={handleLogout}>
            🚪 Logout
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.heading}>{activeSection.replace("-", " ").toUpperCase()}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

// Dummy Data for Graphs
const sampleData = [
    { name: "December", users: 10, educators: 2, uploads: 5 },
  { name: "January", users: 12, educators: 5, uploads: 10 },
  { name: "February", users: 18, educators: 12, uploads: 6 },
  { name: "March", users: 30, educators: 16, uploads: 30 },
];

const contentData = [
  { name: "Videos", count: 7 },
  { name: "Articles", count: 5 },
];

// Dashboard Overview with Large Bar Chart
const DashboardContent = () => (
  <>
    <h2>Overview</h2>
    <p>Welcome to the Admin Dashboard. Here are key statistics.</p>
    <BarChart width={800} height={400} data={sampleData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#004aad" name="Users" />
      <Bar dataKey="educators" fill="#82ca9d" name="Educators" />
    </BarChart>
  </>
);

// User Stats with Large Bar Chart
const UserStatsContent = () => (
  <>
    <h2>User Statistics</h2>
    <BarChart width={800} height={400} data={sampleData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#004aad" name="Total Users" />
      <Bar dataKey="educators" fill="#82ca9d" name="Total Educators" />
    </BarChart>
  </>
);

// Educator Stats with Large Line Chart
const EducatorStatsContent = () => (
  <>
    <h2>Number of Educators</h2>
    <LineChart width={800} height={300} data={sampleData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="educators" stroke="#004aad" name="Total Educators" />
    </LineChart>
  </>
);

// Feedback Stats with Large Bar Chart
const FeedbackContent = () => (
  <>
    <h2>User Feedback</h2>
    <BarChart width={800} height={400} data={sampleData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uploads" fill="#FF5733" name="Total Feedbacks" />
    </BarChart>
  </>
);

// Content Upload Stats with Large Line Chart
const ContentUploadsContent = () => (
  <>
    <h2>Content Uploads</h2>
    <LineChart width={800} height={400} data={sampleData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uploads" stroke="#FF5733" name="Total Uploads" />
    </LineChart>
  </>
);

// 📚 Content Category - Shows Total Videos & Articles
const ContentCategoryContent = () => (
  <>
    <h2>Content Categories</h2>
    <BarChart width={800} height={400} data={contentData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#82ca9d" name="Total Count" />
    </BarChart>
  </>
);

// Styling
const styles = {
  mainContainer: { display: "flex", height: "100vh" },
  sidebar: { width: "250px", background: "#004aad", color: "#fff", padding: "20px" },
  logoText: { fontSize: "20px", marginBottom: "20px", textAlign: "center" },
  navigation: { marginTop: "20px" },
  navItem: { padding: "10px", cursor: "pointer", display: "flex", alignItems: "center", fontSize: "18px" },
  activeNavItem: { background: "#00357a", borderRadius: "5px" },
  navDivider: { height: "1px", background: "#ccc", margin: "10px 0" },
  mainContent: { flex: 1, background: "#f4f4f4", padding: "20px" },
  heading: { fontSize: "22px", marginBottom: "10px" },
};

// Function to handle active navigation
const getNavItemStyle = (section, activeSection) => ({
  ...styles.navItem,
  ...(activeSection === section ? styles.activeNavItem : {}),
});

export default AdminDashboard;
