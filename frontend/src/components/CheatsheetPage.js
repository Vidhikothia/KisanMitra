import React, { useState } from "react";

const CheatSheetPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  
  const cheatSheetSections = [
    {
      title: "Crop Rotation",
      icon: "🌽",
      content: "Practice of alternating crops in the same field to improve soil fertility.\nExamples: Corn → Beans → Wheat.",
      color: "#FFD166" // Yellow
    },
    {
      title: "Soil pH",
      icon: "🧪",
      content: "Ideal range: 6.0 to 7.5 for most crops.\nCorrective measures: Lime for acidic soil, sulfur for alkaline soil.",
      color: "#B18F6A" // Brown
    },
    {
      title: "Irrigation Methods",
      icon: "💧",
      content: "Drip Irrigation: Water-efficient, minimizes evaporation.\nSprinkler Irrigation: Covers large areas, moderate water use.",
      color: "#85C7F2" // Light Blue
    },
    {
      title: "Pest Control",
      icon: "🐞",
      content: "Integrated Pest Management (IPM): Combines biological, cultural, and chemical methods.\nBeneficial Insects: Ladybugs for aphid control.",
      color: "#FF9E7D" // Coral
    },
    {
      title: "Fertilizers",
      icon: "🧑‍🌾",
      content: "Organic: Manure, compost.\nInorganic: NPK fertilizers (Nitrogen, Phosphorus, Potassium).",
      color: "#AEDD94" // Light Green
    },
    {
      title: "Seasonal Crops",
      icon: "🌞",
      content: "Summer: Maize, Cotton.\nWinter: Wheat, Mustard.\nRainy: Rice, Sugarcane.",
      color: "#F8C3CD" // Pink
    },
    {
      title: "Smart Farming Tools",
      icon: "🤖",
      content: "Drones: Field monitoring.\nIoT Sensors: Soil moisture and temperature tracking.",
      color: "#C8B6FF" // Lavender
    },
    {
      title: "Tips for Beginners",
      icon: "🌱",
      content: "Start small with easy-to-grow crops.\nMaintain a farming journal.\nTest soil before planting.",
      color: "#98D8C8" // Mint
    }
  ];

  // Generate plain text content for export
  const getAllContent = () => {
    let fullContent = "📖 Agriculture Cheat Sheet\n\n";
    cheatSheetSections.forEach((section) => {
      fullContent += `${section.icon} ${section.title}:\n${section.content}\n\n`;
    });
    return fullContent;
  };

  // Export as text file using data URI
  const downloadAsText = () => {
    const content = getAllContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agriculture-cheatsheet.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <div style={{
      fontFamily: "'Comic Sans MS', 'Marker Felt', cursive",
      background: "linear-gradient(135deg, #d4f8e8 0%, #bde0fe 100%)",
      minHeight: "100vh",
      padding: "20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute",
        top: "5%",
        left: "5%",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: "#FFD166",
        opacity: 0.3,
        animation: "float 7s ease-in-out infinite"
      }}></div>
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        background: "#85C7F2",
        opacity: 0.3,
        animation: "float 10s ease-in-out infinite"
      }}></div>
      
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(15px, -15px) rotate(5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes wobble {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          .section-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .section-card:hover {
            transform: scale(1.05) rotate(1deg);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          .download-btn {
            transition: all 0.3s ease;
            animation: wobble 2s infinite;
          }
          .download-btn:hover {
            transform: scale(1.1) rotate(-5deg);
          }
          .title-icon {
            display: inline-block;
            animation: bounce 2s infinite;
          }
        `}
      </style>

      <section style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        position: "relative",
        zIndex: 2
      }}>
        <h1 style={{
          fontSize: "3rem",
          color: "#2E7D32",
          textAlign: "center",
          marginBottom: "30px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
        }}>
          <span className="title-icon" style={{ marginRight: "15px" }}>📖</span>
          Super Fun Farm Facts!
          <span className="title-icon" style={{ marginLeft: "15px" }}>🚜</span>
        </h1>
        
        <p style={{
          fontSize: "1.3rem",
          color: "#37474F",
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "bold"
        }}>
          Your handy-dandy guide to farming fun! Click on any card to see more details!
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}>
          {cheatSheetSections.map((section, index) => (
            <div 
              key={index}
              className="section-card"
              style={{
                backgroundColor: section.color,
                borderRadius: "15px",
                padding: "15px",
                boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
                border: activeSection === index ? "4px dashed #333" : "none",
                position: "relative",
                overflow: "hidden"
              }}
              onClick={() => setActiveSection(activeSection === index ? null : index)}
            >
              <div style={{ 
                fontSize: "3rem", 
                textAlign: "center",
                marginBottom: "10px"
              }}>
                {section.icon}
              </div>
              <h3 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
                color: "#333"
              }}>
                {section.title}
              </h3>
              
              {activeSection === index && (
                <div style={{
                  background: "rgba(255,255,255,0.8)",
                  padding: "15px",
                  borderRadius: "10px",
                  marginTop: "10px",
                  whiteSpace: "pre-line",
                  fontSize: "1rem",
                  lineHeight: "1.4"
                }}>
                  {section.content}
                </div>
              )}

              {/* Decorative elements */}
              <div style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)"
              }}></div>
              <div style={{
                position: "absolute",
                bottom: "5px",
                left: "5px",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.5)"
              }}></div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="download-btn"
            onClick={downloadAsText}
            style={{
              padding: "15px 30px",
              fontSize: "1.2rem",
              backgroundColor: "#4CAF50",
              color: "white", 
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
              fontFamily: "inherit"
            }}
          >
            Download Cheat Sheet 📥
          </button>
        </div>

        {/* Show all content in a collapsible section */}
        <div style={{
          maxWidth: "800px",
          margin: "40px auto 0",
          background: "rgba(255,255,255,0.7)",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{
            fontSize: "1.5rem",
            textAlign: "center",
            marginBottom: "15px",
            color: "#2E7D32"
          }}>
            Complete Cheat Sheet
          </h3>
          <pre style={{
            whiteSpace: "pre-wrap",
            fontFamily: "inherit",
            fontSize: "1rem",
            lineHeight: "1.5",
            color: "#333",
            textAlign: "left"
          }}>
            {getAllContent()}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default CheatSheetPage;