import React from 'react';
import './AboutUs.css'; // Import your CSS file for styling
import farmertech from './farmertech.jpeg'; // Import the image from the local folder

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <h2 className="heading">About Us</h2>
        <div className="content">
          <div className="text">
            <p>
              <strong>Kisan Mitra</strong> was created with a single mission in mind: 
              to empower farmers by connecting them with the right resources, 
              government schemes, and expert guidance to improve their livelihoods.
            </p>
            <p>
              In the ever-changing world of agriculture, we strive to provide farmers 
              with the tools and knowledge they need to succeed. Our platform acts as a 
              bridge, bringing advanced farming techniques, expert insights, and critical 
              government support right to your fingertips.
            </p>
            <p>
              Our vision is simple: to ensure that every farmer, regardless of their location, 
              has access to the best agricultural practices, tools, and resources. We believe 
              that through technology and information, we can make a positive, lasting impact on farming communities.
            </p>
          </div>
          <div className="image">
            <img src={farmertech} alt="Farmers working with technology" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
