import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import "./Videos.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

const Insights = () => {
  const [videoCount, setVideoCount] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [topCategory, setTopCategory] = useState("N/A");
  const [latestUpload, setLatestUpload] = useState("N/A");
  const [oldestUpload, setOldestUpload] = useState("N/A");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedVideos")) || [];
    setVideoCount(saved.length);

    const categories = {};
    let latestDate = 0;
    let oldestDate = Date.now();

    saved.forEach((video) => {
      const { category, uploaded_date } = video.content_id || {};

      if (category) {
        categories[category] = (categories[category] || 0) + 1;
      }

      const date = new Date(uploaded_date).getTime();
      if (date > latestDate) latestDate = date;
      if (date < oldestDate) oldestDate = date;
    });

    const categoryData = Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));

    const sorted = [...categoryData].sort((a, b) => b.value - a.value);
    setTopCategory(sorted[0]?.name || "N/A");
    setCategoryBreakdown(categoryData);
    setLatestUpload(latestDate ? new Date(latestDate).toLocaleDateString() : "N/A");
    setOldestUpload(oldestDate ? new Date(oldestDate).toLocaleDateString() : "N/A");
  }, []);

  return (
    <div className="insights-page">
      <h1>📊 Insights</h1>

      <div className="stats-row">
        <div className="stat-box">
          <h2>Total Videos</h2>
          <p>{videoCount}</p>
        </div>
        <div className="stat-box">
          <h2>Top Category</h2>
          <p>{topCategory}</p>
        </div>
        <div className="stat-box">
          <h2>Latest Upload</h2>
          <p>{latestUpload}</p>
        </div>
        <div className="stat-box">
          <h2>Oldest Upload</h2>
          <p>{oldestUpload}</p>
        </div>
      </div>

      {categoryBreakdown.length > 0 && (
        <div className="insight-box">
          <h2>Category Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={categoryBreakdown}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryBreakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default Insights;
