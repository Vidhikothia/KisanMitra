// InsightsEducator.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import './InsightsEducator.css';

const InsightsEducator = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/content/videos/educators', {
          withCredentials: true,
        });

        const videos = res.data;

        // Group videos by month
        const grouped = {};

        videos.forEach(video => {
          const date = moment(video.content_id?.uploaded_date);
          const month = date.format("YYYY-MM"); // Example: "2025-04"
          grouped[month] = (grouped[month] || 0) + 1;
        });

        // Convert to array for Recharts
        const chartData = Object.keys(grouped).map(month => ({
          month,
          count: grouped[month],
        })).sort((a, b) => new Date(a.month) - new Date(b.month));

        setMonthlyData(chartData);
      } catch (err) {
        console.error('Error fetching video insights:', err);
        setError("Failed to fetch insights");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading insights...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="insights-container">
      <h2>📊 Monthly Video Uploads</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsightsEducator;
