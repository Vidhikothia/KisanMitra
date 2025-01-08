import React from "react";
import "./Mantra.css";

const Mantra = () => {
  // List of 10 mantras
  const mantras = [
    "“The best fertilizer is the farmer's shadow.”",
    "“Agriculture is the foundation of civilization.”",
    "“The earth is what we all have in common.”",
    "“Farming is a profession of hope.”",
    "“Without agriculture, life is impossible.”",
    "“Sowing seeds of knowledge for the future.”",
    "“A farm is a reflection of the farmer's work.”",
    "“Farmers are the backbone of a nation.”",
    "“The farmer is the one who feeds the world.”",
    "“In every grain of rice, there's a farmer's care.”"
  ];

  // Function to select a random mantra
  const randomMantra = mantras[Math.floor(Math.random() * mantras.length)];

  return (
    <div className="mantra">
      <p>{randomMantra}</p>
    </div>
  );
};

export default Mantra;
