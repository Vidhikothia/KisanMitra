import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Mantra from "./components/Mantra";
import VideoCards from "./components/VideoCards";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import "./App.css";
import RegisterPage from "./components/RegisterPage";
import ArticlePage from "./components/ArticlePage";
import CheatsheetPage from "./components/CheatsheetPage";
import Scheme from "./components/scheme";
import AboutUs from "./components/AboutUs";
import Videos from "./components/Videos";
import Crop from './components/Crop'; // Make sure the path is correct

const App = () => {
  return (
    <Router>
      <Navbar />
      <div id="google_translate_element" style={{ display: 'none' }}></div>

      <Routes>
        {/* Route for the homepage */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Mantra />
              <Crop />
              <VideoCards />
              <Scheme />
              <Footer />
            </>
          }
        />
        
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/cheatsheet" element={<CheatsheetPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/videos" element={<Videos />} />



      </Routes>
    </Router>
  );
};

export default App;
