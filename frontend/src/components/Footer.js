import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-content">
          <h2>KisanMitra</h2>
          <p>
            Empowering farmers with the right information, tools, and resources to grow and prosper.
          </p>
        </div>
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
      </div>
      <div className="footer-bottom">
        <div className="social-media">
          <p>Follow us:</p>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a> | 
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> Instagram</a>
        </div>
        <p>© 2024 KisanMitra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
