import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Main Info Section */}
        <div className="footer-content">
          <h2 className="footer-brand">KisanMitra</h2>
          <p className="footer-tagline">
            Empowering farmers with the right information, tools, and resources to grow and prosper.
          </p>
        </div>

        {/* Resources Section */}
        <div className="footer-links">
          <h3 className="footer-section-title">Resources</h3>
          <ul>
            <li>
              <a href="/article" className="footer-link">
                <span className="link-icon">📖</span> Articles
              </a>
            </li>
            <li>
              <a href="/video" className="footer-link">
                <span className="link-icon">🎥</span> Videos
              </a>
            </li>
            <li>
              <a href="/cheatsheet" className="footer-link">
                <span className="link-icon">📜</span> Cheatsheets
              </a>
            </li>
          </ul>
        </div>

        {/* Explore Section */}
        <div className="footer-links">
          <h3 className="footer-section-title">Explore Government Schemes</h3>
          <ul>
            <li>
              <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" className="footer-link">
                PM Kisan Samman Nidhi
              </a>
            </li>
            <li>
              <a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer" className="footer-link">
                Pradhan Mantri Fasal Bima Yojana
              </a>
            </li>
            <li>
              <a href="https://enam.gov.in/web/" target="_blank" rel="noopener noreferrer" className="footer-link">
                National Agriculture Market (eNAM)
              </a>
            </li>
            <li>
              <a href="https://www.nhmb.gov.in/" target="_blank" rel="noopener noreferrer" className="footer-link">
                Soil Health Management
              </a>
            </li>
            <li>
              <a href="http://rkvy.nic.in/" target="_blank" rel="noopener noreferrer" className="footer-link">
                Rashtriya Krishi Vikas Yojana
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-links">
          <h3 className="footer-section-title">Contact Us</h3>
          <ul>
            <li>
              <a href="/aboutus" className="footer-link">
                <span className="link-icon">ℹ️</span> About Us
              </a>
            </li>
            <li>
              <span className="contact-info">
                <span className="link-icon">📧</span> 
                <a href="mailto:support@kisanmitra.com" className="footer-link">
                  support@kisanmitra.com
                </a>
              </span>
            </li>
            <li>
              <span className="contact-info">
                <span className="link-icon">📞</span>
                <a href="tel:+911234567890" className="footer-link">
                  +91 123 456 7890
                </a>
              </span>
            </li>
            <li>
              <span className="contact-info">
                <span className="link-icon">📍</span> 
                KisanMitra, Agri Tower, New Delhi, India
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p className="copyright">© 2025 KisanMitra. All rights reserved.</p>
        <div className="social-media">
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;