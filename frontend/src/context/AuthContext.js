import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user from backend
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/profile", { withCredentials: true });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data?.message || "Server error");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch user on page load
  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Function to update user state after login
  const loginUser = async () => {
    await fetchUser(); // Fetch user again after login
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
