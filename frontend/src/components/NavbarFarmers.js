import React, { useState, useEffect } from 'react';
import './NavbarFarmers.css';
import { Link } from 'react-router-dom';
import { 
  FaGlobeAmericas, FaSun, FaMoon, FaSignOutAlt, FaUserEdit, FaBell, 
  FaMoneyBillWave,  FaChalkboardTeacher, 
   
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import km from "./kisanmitra.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [profilePhoto, setProfilePhoto] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

  const navigate = useNavigate();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  const handleLanguageChange = (langCode) => {
    const googleTranslateDropdown = document.querySelector('.goog-te-combo');
    if (googleTranslateDropdown) {
      googleTranslateDropdown.value = langCode;
      googleTranslateDropdown.dispatchEvent(new Event('change'));
    }
  };

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isDarkMode ? 'dark' : ''}`}>
      <div className="logo">
        <img src={km} alt="Schemes" className="kisanmitra" />
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li className="dropdown-parent">
          <a href="#resources">Resources</a>
          <ul className="dropdown">
            <li><a href="/article">Article</a></li>
            <li><a href="/videos">Video</a></li>
            <li><a href="/cheatsheet">Cheatsheet</a></li>
          </ul>
        </li>
        <li className="dropdown-parent">
          <a href="#language"><FaGlobeAmericas /></a>
          <ul className="dropdown">
            <li onClick={() => handleLanguageChange('en')}>English</li>
            <li onClick={() => handleLanguageChange('hi')}>Hindi</li>
            <li onClick={() => handleLanguageChange('gu')}>Gujarati</li>
          </ul>
        </li>
        {/* <li>
          <a href="#mode" onClick={toggleMode}>{isDarkMode ? <FaSun /> : <FaMoon />}</a>
        </li> */}
        <li className="notification-icon">
          <a href="#notifications">
            <FaBell />
            {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
          </a>
        </li>
        <li 
          className="profile-dropdown"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <a href="#profile">
            <img src={profilePhoto} alt="Profile" className="profile-photo" />
          </a>
          {isProfileHovered && (
            <div className="profile-submenu">
              <ul>
                <li>
                  <FaUserEdit />
                  <Link to="/ProfileManagement">Manage Profile</Link>
                </li>
                <li>
                  <FaChalkboardTeacher />
                  <Link to="/BecomeEducator">Become an Educator</Link>
                </li>
                
                <li>
                  <FaSignOutAlt />
                  <a href="/login" onClick={handleLogout}>Logout</a>
                </li>
                <hr className="profile-submenu-divider" />
                <li>
                  <FaMoneyBillWave />
                  <a href="/subscription">Subscription</a>
                </li>
                <li>
                  <FaBell />
                  <a href="/notifications">Notifications</a>
                </li>
                <hr className="profile-submenu-divider" />
                <li>
                {isDarkMode ? <FaSun /> : <FaMoon />}
                  <a href="#mode" onClick={toggleMode}>  Appearance</a>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;