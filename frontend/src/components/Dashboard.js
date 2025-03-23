import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Dashboard = () => {
  const [openedCount, setOpenedCount] = useState(0);

  useEffect(() => {
    // Fetch website opened count from the backend
    axios.get('http://localhost:5000/analytics/website-count')
      .then((response) => {
        setOpenedCount(response.data.websiteOpenedCount);
      })
      .catch((error) => {
        console.error('There was an error fetching the count!', error);
      });

    // Increment the website opened count each time the page is opened
    axios.post('http://localhost:5000/analytics/increment-count')
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error('Error incrementing the count:', error);
      });
  }, []);

  return (
    <DashboardContainer>
      <Title>Website Opened Count</Title>
      <CountBox>
        <Count>{openedCount}</Count>
      </CountBox>
    </DashboardContainer>
  );
};

export default Dashboard;

// Styled Components

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://www.hdwallpapers.in/download/closeup_view_of_green_wheat_field_in_blur_blue_sky_background_hd_nature-HD.jpg'); /* Add your image path here */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white; /* Changed to white for visibility */
  margin-bottom: 20px;
  text-align: center;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Count = styled.span`
  font-size: 8rem;
  font-weight: bold;
  color: white; /* Changed to white for visibility */
  text-align: center;
`;


