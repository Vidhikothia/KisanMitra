import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import './dashboardAdmin.css';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend, 
  ArcElement, 
  PointElement, 
  LineElement,
  Title
);

const AdminDashboard = () => {
  const [videoCount, setVideoCount] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalSaves, setTotalSaves] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEducators: 0,
    websiteVisitors: 0,
  });

  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    userGrowth: [],
    educatorGrowth: [],
  });

  const chartRef = useRef();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch video data
        const videoResponse = await fetch("http://localhost:5000/content/videos");
        const videoData = await videoResponse.json();

        // Set video count
        setVideoCount(videoData.length);

        // Calculate total likes and saves
        const totalLikesSum = videoData.reduce((sum, video) => sum + (video.like_count || 0), 0);
        const totalSavesSum = videoData.reduce((sum, video) => sum + (video.saved_count || 0), 0);
        setTotalLikes(totalLikesSum);
        setTotalSaves(totalSavesSum);

        // Fetch other analytics
        const usersResponse = await axios.get("http://localhost:5000/analytics/total-users");
        const educatorsResponse = await axios.get("http://localhost:5000/analytics/total-educators");
        const visitorsResponse = await axios.get("http://localhost:5000/analytics/website-count");

        setStats({
          totalUsers: usersResponse.data.totalUsers || 0,
          totalEducators: educatorsResponse.data.totalEducators || 0,
          websiteVisitors: visitorsResponse.data.websiteOpenedCount || 0,
        });

        // Increment website visit count
        await axios.post("http://localhost:5000/analytics/increment-count");

        // Fetch monthly user/educator growth
        const monthlyResponse = await axios.get("http://localhost:5000/analytics/monthly-growth");
        setMonthlyData(monthlyResponse.data);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleDownloadPDF = async () => {
    const input = chartRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 180;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 15, 20, pdfWidth, pdfHeight);
    pdf.save("dashboard-analytics.pdf");
  };

  const barChartData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Users",
        data: monthlyData.userGrowth,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Educators",
        data: monthlyData.educatorGrowth,
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Growth",
        font: {
          size: 16,
        }
      },
    },
  };

  const doughnutData = {
    labels: ["Users", "Educators"],
    datasets: [
      {
        data: [stats.totalUsers, stats.totalEducators],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(153, 102, 255, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "User Distribution",
        font: {
          size: 16,
        }
      },
    },
  };

  const engagementData = {
    labels: ["Likes", "Saves"],
    datasets: [
      {
        label: "Engagement",
        data: [totalLikes, totalSaves],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const engagementOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Content Engagement",
        font: {
          size: 16,
        }
      },
    },
  };


 

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading amazing stats...</p>
      </div>
    </div>
  );

  // Navigation menu items
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "users", icon: "👥", label: "Users" },
    { id: "content", icon: "🎬", label: "Content" },
    { id: "analytics", icon: "📈", label: "Analytics" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className="outer-container">
    <div className="flex h-screen bg-gray-50">
      

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top navbar */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        {/* Dashboard content */}
        <div className="p-6 px-4 md:px-8">
        {/* Stats cards */}
          <div className="dashboard-grid">
      <div className="card border-blue">
        <div className="card-content">
          <div>
            <p className="label">Total Users</p>
            <p className="value">{stats.totalUsers}</p>
          </div>
          <div className="icon bg-blue">👥</div>
        </div>
      </div>

      <div className="card border-purple">
        <div className="card-content">
          <div>
            <p className="label">Total Educators</p>
            <p className="value">{stats.totalEducators}</p>
          </div>
          <div className="icon bg-purple">🎓</div>
        </div>
      </div>

      <div className="card border-green">
        <div className="card-content">
          <div>
            <p className="label">Website Visitors</p>
            <p className="value">{stats.websiteVisitors}</p>
          </div>
          <div className="icon bg-green">🌐</div>
        </div>
      </div>

      <div className="card border-yellow">
        <div className="card-content">
          <div>
            <p className="label">Total Videos</p>
            <p className="value">{videoCount}</p>
          </div>
          <div className="icon bg-yellow">🎬</div>
        </div>
      </div>

      <div className="card border-red">
        <div className="card-content">
          <div>
            <p className="label">Total Likes</p>
            <p className="value">{totalLikes}</p>
          </div>
          <div className="icon bg-red">❤️</div>
        </div>
      </div>

      <div className="card border-teal">
        <div className="card-content">
          <div>
            <p className="label">Total Saves</p>
            <p className="value">{totalSaves}</p>
          </div>
          <div className="icon bg-teal">💾</div>
        </div>
      </div>
    </div>

          {/* Charts section */}
          {/* Charts section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
  {/* Bar Chart + Doughnut Side by Side */}
  <div className="flex flex-col gap-6 lg:flex-row w-full">
    <div className="flex-1 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">User Stats</h2>
      <div style={{ height: "250px" }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>

    <div className="flex-1 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">User Types</h2>
      <div style={{ height: "250px" }}>
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
    </div>
  </div>

  {/* Line Chart */}
  {/* <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow col-span-1">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Visitor Trend</h2>
    <div style={{ height: "300px" }}>
      <Line data={visitorTrendData} options={visitorTrendOptions} />
    </div>
  </div> */}
  


  {/* Engagement Bar Chart */}
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow col-span-1">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Engagement Overview</h2>
    <div style={{ height: "300px" }}>
      <Bar data={engagementData} options={engagementOptions} />
    </div>
  </div>
</div>
<br></br><br></br>

          {/* Actions section */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleDownloadPDF} 
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>📄</span> Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;