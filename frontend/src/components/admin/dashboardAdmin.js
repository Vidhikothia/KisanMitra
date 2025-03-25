import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

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
        <h2 style={styles.logoText}>Admin Panel</h2>

        <nav style={styles.navigation}>
          <div style={getNavItemStyle("dashboard", activeSection)} onClick={() => navigateTo("dashboard")}>
            📊 Dashboard
          </div>
          <div style={getNavItemStyle("user-stats", activeSection)} onClick={() => navigateTo("user-stats")}>
            👥 User Stats
          </div>
          <div style={getNavItemStyle("educator-stats", activeSection)} onClick={() => navigateTo("educator-stats")}>
            👨‍🏫 Educator Stats
          </div>
          <div style={getNavItemStyle("feedback", activeSection)} onClick={() => navigateTo("feedback")}>
            💬 Feedback
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
  { name: "January", users: 1200, educators: 200, uploads: 400 },
  { name: "February", users: 1500, educators: 250, uploads: 500 },
  { name: "March", users: 1800, educators: 300, uploads: 600 },
  { name: "April", users: 2000, educators: 320, uploads: 700 },
];

const pieDataUsers = [
  { name: "Farmers", value: 65 },
  { name: "Educators", value: 25 },
  { name: "Admins", value: 10 },
];

const pieDataContent = [
  { name: "Videos", value: 60 },
  { name: "Articles", value: 40 },
];

// Dashboard Overview
const DashboardContent = () => (
  <>
    <h2>Overview</h2>
    <p>Welcome to the Admin Dashboard. Here are key statistics.</p>
    <BarChart width={600} height={300} data={sampleData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="users" fill="#8884d8" />
      <Bar dataKey="educators" fill="#82ca9d" />
    </BarChart>
  </>
);

// User Stats with Pie Chart
const UserStatsContent = () => (
  <>
    <h2>User Statistics</h2>
    <PieChart width={400} height={400}>
      <Pie dataKey="value" data={pieDataUsers} cx="50%" cy="50%" outerRadius={100} fill="#004aad" label />
    </PieChart>
  </>
);

// Educator Stats with Line Chart
const EducatorStatsContent = () => (
  <>
    <h2>Educator Performance</h2>
    <LineChart width={600} height={300} data={sampleData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="educators" stroke="#004aad" />
    </LineChart>
  </>
);

// Feedback Stats with Bar Chart
const FeedbackContent = () => (
  <>
    <h2>User Feedback</h2>
    <BarChart width={600} height={300} data={sampleData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uploads" fill="#FF5733" />
    </BarChart>
  </>
);

// Content Upload Stats with Line Chart
const ContentUploadsContent = () => (
  <>
    <h2>Content Uploads</h2>
    <LineChart width={600} height={300} data={sampleData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uploads" stroke="#FF5733" />
    </LineChart>
  </>
);

// 📚 Content Category - Shows Video vs. Article Count
const ContentCategoryContent = () => (
  <>
    <h2>Content Categories</h2>
    <PieChart width={400} height={400}>
      <Pie dataKey="value" data={pieDataContent} cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label />
    </PieChart>
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