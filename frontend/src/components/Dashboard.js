import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEducators: 0,
    websiteVisitors: 0
  });

  useEffect(() => {
    // Fetch statistics from backend
    const fetchStats = async () => {
      try {
        // Separate API calls for each statistic
        const usersResponse = await axios.get('http://localhost:5000/analytics/total-users');
        const educatorsResponse = await axios.get('http://localhost:5000/analytics/total-educators');
        const visitorsResponse = await axios.get('http://localhost:5000/analytics/website-count');
        
        setStats({
          totalUsers: usersResponse.data.totalUsers || 300,
          totalEducators: educatorsResponse.data.totalEducators || 30,
          // totalUsers:500,
          // totalEducators:500,
          websiteVisitors: visitorsResponse.data.websiteOpenedCount || 0
        });
        
        // Increment website visited count
        await axios.post('http://localhost:5000/analytics/increment-count');
      } catch (error) {
        console.error('Error fetching statistics:', error);
        
        // Fallback to default values if API fails
        setStats({
          totalUsers: 300,
          totalEducators: 30,
          websiteVisitors: 0
        });
      }
    };

    fetchStats();
  }, []);

  const statsItems = [
    { 
      number: `${stats.totalUsers}+`, 
      label: 'REGULER FARMERS' 
    },
    { 
      number: `${stats.totalEducators}+`, 
      label: 'REGULER EDUCATORES' 
    },
    { 
      number: `${stats.websiteVisitors}+`, 
      label: 'WEBSITE VISITORS' 
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: `url('https://www.hdwallpapers.in/download/closeup_view_of_green_wheat_field_in_blur_blue_sky_background_hd_nature-HD.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '2.8rem',
        marginBottom: '40px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}>
        WHY CHOOSE US
      </h1>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        flexWrap: 'wrap'
      }}>
        {statsItems.map((item, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)', // For Safari compatibility
            borderRadius: '10px',
            width: '200px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          >
            <div style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '10px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              {item.number}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: 'white',
              opacity: 0.8,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;