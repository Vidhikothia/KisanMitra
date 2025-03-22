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
  background-color: #f4f4f9;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Count = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4CAF50;
  text-align: center;
`;
