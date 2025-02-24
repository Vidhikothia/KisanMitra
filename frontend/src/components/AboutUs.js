import React from 'react';
import './AboutUs.css'; 
import { FaSeedling, FaHandsHelping, FaLightbulb, FaTractor, FaGlobe, FaHandshake } from 'react-icons/fa'; 
import farmertech from './farmertech.jpeg'; 
import team1 from './team1.jpg'; 
import team2 from './team2.jpg'; 
import team3 from './team3.jpg'; 

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        
        <div className="content">
          <div className="text">
            <h2 className="intro">
              Empowering Farmers, Transforming Lives
            </h2>
            <p>
              At <strong>KisanMitra</strong>, we believe that farmers are the backbone of our society. 
            </p>
            <div className="highlights">
              <div className="highlight">
                <FaSeedling className="icon" />
                <p>
                  <strong>Our Mission:</strong> To empower farmers by connecting them with the right resources, 
                  government schemes, and expert guidance. We aim to uplift their livelihoods and create sustainable growth opportunities.
                </p>
              </div>
              <div className="highlight">
                <FaHandsHelping className="icon" />
                <p>
                  <strong>Our Approach:</strong> Acting as a bridge between farmers and technology, 
                  we bring advanced techniques, insightful guidance, and critical government support right to their fingertips.
                </p>
              </div>
              <div className="highlight">
                <FaLightbulb className="icon" />
                <p>
                  <strong>Our Vision:</strong> To ensure that every farmer, regardless of location, 
                  has access to the best agricultural practices, tools, and resources needed for success.
                </p>
              </div>
              <div className="highlight">
                <FaTractor className="icon" />
                <p>
                  <strong>Innovation in Agriculture:</strong> We introduce modern farming tools, sustainable practices, 
                  and data-driven insights to help farmers increase productivity and reduce risks.
                </p>
              </div>
              <div className="highlight">
                <FaGlobe className="icon" />
                <p>
                  <strong>Global Impact:</strong> By improving farming practices locally, 
                  we contribute to a more sustainable and food-secure world. We envision a future where no farmer is left behind.
                </p>
              </div>
            </div>
          </div>
          <div className="image">
            <img src={farmertech} alt="Farmers working with technology" />
          </div>
        </div>

        <div className="meet-the-team">
          <h3 className="section-title">Meet the Team Behind KisanMitra</h3>
          
          <div className="team-members">
            <div className="team-member">
              <img src={team1} alt="Vidhi Kothia" />
              <h4>Vidhi Kothia</h4>
            </div>
            <div className="team-member">
              <img src={team2} alt="Kruti Talaviya" />
              <h4>Kruti Talaviya</h4>
            </div>
            <div className="team-member">
              <img src={team3} alt="Drashti Sitapara" />
              <h4>Drashti Sitapara</h4>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
