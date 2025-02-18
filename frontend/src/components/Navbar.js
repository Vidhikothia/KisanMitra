import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Add custom CSS
import { FaLanguage, FaSun, FaMoon } from 'react-icons/fa';
import km from "./kisanmitra.png";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect Scroll
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  // Handle Language Change
  const handleLanguageChange = (langCode) => {
    const googleTranslateDropdown = document.querySelector('.goog-te-combo');
    if (googleTranslateDropdown) {
      googleTranslateDropdown.value = langCode;
      googleTranslateDropdown.dispatchEvent(new Event('change')); // Trigger translation
    }
  };

  // Toggle Dark/Light Mode
  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply Dark/Light Theme
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
    document.body.style.color = isDarkMode ? '#ffffff' : '#000000';

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDarkMode]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
      <img src={km} alt="Schemes" className="kisanmitra" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/videouploadform">Become an Educator</a></li>
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

        {/* Language Dropdown */}
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

        {/* Dark/Light Mode Toggle */}
        <li>
          <a href="#mode" onClick={toggleMode} style={{ cursor: 'pointer' }}>
            {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
