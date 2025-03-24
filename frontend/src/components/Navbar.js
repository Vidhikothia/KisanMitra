import React, { useState, useEffect } from 'react';
import './Navbar.css'; 
import { FaLanguage, FaSun, FaMoon, FaSignOutAlt, FaUserEdit, FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import km from "./kisanmitra.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEducator, setIsEducator] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleLanguageChange = (langCode) => {
    const googleTranslateDropdown = document.querySelector('.goog-te-combo');
    if (googleTranslateDropdown) {
      googleTranslateDropdown.value = langCode;
      googleTranslateDropdown.dispatchEvent(new Event('change'));
    }
  };

  const toggleMode = () => setIsDarkMode(prev => !prev);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) navigate("/login");
      else console.error("Logout failed");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleProfile = () => setIsProfileOpen(prev => !prev);

  const becomeEducator = () => setIsEducator(true);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : ''}`}>
      <div className="logo">
        <img src={km} alt="Schemes" className="kisanmitra" />
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/aboutus">About Us</a></li>

        {isEducator ? (
          <li>
            <a href="#uploads"><FaUpload /> Upload</a>
            <ul className="dropdown">
              <li><a href="/videouploadform">Upload Video</a></li>
              <li><a href="/cheatsheetuploadform">Upload Cheatsheet</a></li>
              <li><a href="/articleuploadform">Upload Article</a></li>
            </ul>
          </li>
        ) : (
          <li><a href="#become-educator" onClick={becomeEducator}>Become an Educator</a></li>
        )}

        <li>
          <a href="#profile" onClick={toggleProfile}>
            <img src={profilePhoto} alt="Profile" className="profile-photo" />
          </a>
          {isProfileOpen && (
            <ul className="dropdown">
              <li><a href="/manageprofile"><FaUserEdit /> Manage Profile</a></li>
              <li><a href="/login" onClick={handleLogout}><FaSignOutAlt /> Logout</a></li>
            </ul>
          )}
        </li>

        <li>
          <a href="#resources">Resources</a>
          <ul className="dropdown">
            <li><a href="/article">Article</a></li>
            <li><a href="/videos">Video</a></li>
            <li><a href="/cheatsheet">Cheatsheet</a></li>
          </ul>
        </li>

        <li>
          <a href="#language"><FaLanguage /></a>
          <ul className="dropdown">
            <li onClick={() => handleLanguageChange('en')}>English</li>
            <li onClick={() => handleLanguageChange('hi')}>Hindi</li>
            <li onClick={() => handleLanguageChange('gu')}>Gujarati</li>
          </ul>
        </li>

        <li>
          <a href="#mode" onClick={toggleMode}>
            {isDarkMode ? <FaSun /> : <FaMoon />} 
          </a>
        </li>
        <li><a href="/login">Login</a></li>

      </ul>
    </nav>
  );
};

export default Navbar;
