import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      

      <div className="footer-top">
        {/* Main Info Section */}
        <div className="footer-content">
          <h2>KisanMitra</h2>
          <p>
            Empowering farmers with the right information, tools, and resources to grow and prosper.
          </p>
        </div>
        {/* Resources Section */}
        <div className="footer-links">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="/article">📖 Articles</a>
            </li>
            <li>
              <a href="/video">🎥 Videos</a>
            </li>
            <li>
              <a href="/cheatsheet">📜 Cheatsheets</a>
            </li>
          </ul>
        </div>

        {/* Explore Section */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer">
                PM Kisan Samman Nidhi
              </a>
            </li>
            <li>
              <a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer">
                Pradhan Mantri Fasal Bima Yojana
              </a>
            </li>
            <li>
              <a href="https://enam.gov.in/web/" target="_blank" rel="noopener noreferrer">
                National Agriculture Market (eNAM)
              </a>
            </li>
            <li>
              <a href="https://www.nhmb.gov.in/" target="_blank" rel="noopener noreferrer">
                Soil Health Management
              </a>
            </li>
            <li>
              <a href="http://rkvy.nic.in/" target="_blank" rel="noopener noreferrer">
                Rashtriya Krishi Vikas Yojana
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-links">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href="/aboutus">ℹ️ About Us</a>
            </li>
            <li>
              📧 Email: <a href="mailto:support@kisanmitra.com">support@kisanmitra.com</a>
            </li>
            <li>
              📞 Phone: <a href="tel:+911234567890">+91 123 456 7890</a>
            </li>
            <li>
              📍 Address: KisanMitra, Agri Tower, New Delhi, India
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2025 KisanMitra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
