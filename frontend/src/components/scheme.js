import React from 'react';
import './scheme.css'; // Updated CSS file for styling

const Scheme = () => {
  return (
    <div className="home">
      <section className="schemes-section">
        <div className="content-container">
          <div className="text-side">
            <h1 className="section-title">Government Schemes for Farmers</h1>
            <p className="section-description">
              Empowering farmers through innovative and accessible schemes. These initiatives 
              are designed to provide financial support, improve sustainability, and foster growth 
              in agriculture.
            </p>
            <div className="card-container">
              <div className="scheme-card">
                <h2>PM Kisan Samman Nidhi Yojana</h2>
                <p>Financial assistance for farmers to provide income support.</p>
                <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer">
                  Learn More →
                </a>
              </div>
              <div className="scheme-card">
                <h2>Pradhan Mantri Fasal Bima Yojana (PMFBY)</h2>
                <p>Crop insurance scheme for farmers to protect against crop loss.</p>
                <a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer">
                  Learn More →
                </a>
              </div>
              <div className="scheme-card">
                <h2>National Agriculture Market (eNAM)</h2>
                <p>A digital platform to facilitate direct sale of produce to buyers.</p>
                <a href="https://enam.gov.in/web/" target="_blank" rel="noopener noreferrer">
                  Learn More →
                </a>
              </div>
              <div className="scheme-card">
                <h2>Soil Health Management (SHM)</h2>
                <p>Improve soil health through testing and management initiatives.</p>
                <a href="https://www.nhmb.gov.in/" target="_blank" rel="noopener noreferrer">
                  Learn More →
                </a>
              </div>
              <div className="scheme-card">
                <h2>Rashtriya Krishi Vikas Yojana (RKVY)</h2>
                <p>Enhance agricultural production through state support.</p>
                <a href="http://rkvy.nic.in/" target="_blank" rel="noopener noreferrer">
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Scheme;
