import React from 'react';
import "./Crop.css";
const Crop = () => {

  const handleClick = () => {
    // Redirect to the crop recommendation form hosted by Flask
    window.location.href = 'http://localhost:5000';  // Flask app URL
  };

  return (
    <div 
      className="crop-recommendation-icon"
      onClick={handleClick}
    >
      <div className="icon">
        🌱
      </div>
    </div>
  );
};

export default Crop;
