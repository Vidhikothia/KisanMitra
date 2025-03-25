import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Mantra from "./components/Mantra";
import VideoCards from "./components/VideoCards";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import "./App.css";
import ManageProfile from './components/ManageProfile';
import NavbarSwitcher from "./components/NavbarSwitcher";
import RegisterPage from "./components/RegisterPage";
import ArticlePage from "./components/ArticlePage";
import CheatsheetPage from "./components/CheatsheetPage";
import Scheme from "./components/scheme";
import AboutUs from "./components/AboutUs";
import Videos from "./components/Videos";
import Crop from './components/Crop';
import PlantDiseaseDetection from './components/PlantDiseaseDetection';
import VideoUploadForm from "./components/VideoUploadForm";
import ArticleUploadForm from "./components/ArticleUploadForm";
import CheatsheetUploadForm from "./components/CheatsheetUploadForm";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/admin/dashboardAdmin";
import FeedbackForm from "./components/FeedbackForm";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Separate Admin Dashboard Route (No Navbar) */}
        <Route path="/admindashboard" element={<AdminDashboard />} />

        {/* ✅ Main Layout with Navbar */}
        <Route
          path="/*"
          element={
            <>
             <NavbarSwitcher /> 
              <div id="google_translate_element" style={{ display: 'none' }}></div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
                      <Mantra />
                      <Crop />
                      <PlantDiseaseDetection />
                      <VideoCards />
                      <Dashboard />
                      <Scheme />
                      <Footer />
                    </>
                  }
                />
                <Route path="/feedbackform" element={<FeedbackForm />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/article" element={<ArticlePage />} />
                <Route path="/cheatsheet" element={<CheatsheetPage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/videouploadform" element={<VideoUploadForm />} />
                <Route path="/cheatsheetuploadform" element={<CheatsheetUploadForm />} />
                <Route path="/articleuploadform" element={<ArticleUploadForm />} />
                <Route path="/manageprofile" element={<ManageProfile />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
