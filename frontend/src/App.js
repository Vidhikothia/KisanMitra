import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Mantra from "./components/Mantra";
import VideoCards from "./components/VideoCards";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import "./App.css";
import BecomeEducator from './components/farmerMenu/BecomeEducator';
import ProfileManagement from "./components/ProfileManagement.js";
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
import ManageContent from './components/educatorMenu/ManageContent.js'
import SavedVideos from './components/SavedVideos.js'
import NotificationList from './components/NotificationList.js'
import InsightsEducator from "./components/educatorMenu/InsightsEducator.js";
import Insights from "./components/Insights.js";
import Subscription from './components/Subscription'; // or wherever your file is

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

                <Route path="/subscription" element={<Subscription />} />
                <Route path="/feedbackform" element={<FeedbackForm />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/insightsedu" element={<InsightsEducator />} />
                <Route path="/article" element={<ArticlePage />} />
                <Route path="/cheatsheet" element={<CheatsheetPage />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/saved-content" element={<SavedVideos />} />
                <Route path="/notifications" element={<NotificationList />} />
                <Route path="/cheatsheetuploadform" element={<CheatsheetUploadForm />} />
                <Route path="/articleuploadform" element={<ArticleUploadForm />} />
                <Route path="/BecomeEducator" element={<BecomeEducator />} />
                <Route path="/ProfileManagement" element={<ProfileManagement />} />
                <Route path="/ManageContent" element={<ManageContent />} />
                <Route path="/videouploadform" element={<VideoUploadForm />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;