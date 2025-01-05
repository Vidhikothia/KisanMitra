import axios from 'axios';

// Set the base URL for your API
const API_URL = 'http://localhost:5000/api';  // Adjust to your backend URL

// Function to create a user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};
