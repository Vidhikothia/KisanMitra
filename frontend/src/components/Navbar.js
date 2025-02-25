import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Add custom CSS
import { FaLanguage, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import km from "./kisanmitra.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Detect Scroll
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  // Handle Language Change
  const handleLanguageChange = (langCode) => {
    const googleTranslateDropdown = document.querySelector('.goog-te-combo');
    if (googleTranslateDropdown) {
      googleTranslateDropdown.value = langCode;
      googleTranslateDropdown.dispatchEvent(new Event('change'));
    }
  };

  // Toggle Dark/Light Mode
  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply Dark/Light Theme
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDarkMode]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : ''}`}>
      <div className="logo">
        <img src={km} alt="Schemes" className="kisanmitra" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li>
          <a href="#educate">Become an Educator</a>
          <ul className="dropdown">
            <li><a href="/videouploadform">Upload Video</a></li>
            <li><a href="/cheatsheetuploadform">Upload Cheatsheet</a></li>
            <li><a href="/articleuploadform">Upload Article</a></li>
          </ul>
        </li>
        <li>
          <a href="#resources">Resources</a>
          <ul className="dropdown">
            <li><a href="/article">Article</a></li>
            <li><a href="/videos">Video</a></li>
            <li><a href="/cheatsheet">Cheatsheet</a></li>
          </ul>
        </li>
        <li><a href="/aboutus">About Us</a></li>
        <li><a href="/login">Login</a></li>

        <li>
          <a href="#language">
            <FaLanguage style={{ marginRight: '5px' }} />
          </a>
          <ul className="dropdown">
            <li onClick={() => handleLanguageChange('en')}>English</li>
            <li onClick={() => handleLanguageChange('hi')}>Hindi</li>
            <li onClick={() => handleLanguageChange('gu')}>Gujarati</li>
          </ul>
        </li>

        <li>
          <a href="#mode" onClick={toggleMode} style={{ cursor: 'pointer' }}>
            {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </a>
        </li>

        <li>
          <a href="#logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <FaSignOutAlt /> Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
