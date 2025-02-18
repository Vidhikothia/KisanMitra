import React from 'react';
import "./PlantDiseaseDetection.css"; // Use the updated CSS

const PlantDiseaseDetection = () => {
    const handleClick = () => {
        // Redirect to the Flask app for Plant Disease Detection
        window.location.href = 'http://localhost:8501'; // Replace with your Flask app URL
    };

    return (
        <div 
            className="plant-disease-detection-icon" 
            onClick={handleClick}
        >
            <div className="icon">🩺</div>
            <span className="icon-label">Detect Disease</span>
        </div>
    );
};

export default PlantDiseaseDetection;
