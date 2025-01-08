import React from "react";
import jsPDF from "jspdf";
import Navbar from "./Navbar"; // Import the Navbar component

const CheatSheetPage = () => {
  const cheatSheetContent = `
📖 Agriculture Cheat Sheet

1️⃣ Crop Rotation:
   - Practice of alternating crops in the same field to improve soil fertility.
   - Examples: Corn → Beans → Wheat.

2️⃣ Soil pH:
   - Ideal range: 6.0 to 7.5 for most crops.
   - Corrective measures: Lime for acidic soil, sulfur for alkaline soil.

3️⃣ Irrigation Methods:
   - Drip Irrigation: Water-efficient, minimizes evaporation.
   - Sprinkler Irrigation: Covers large areas, moderate water use.

4️⃣ Pest Control:
   - Integrated Pest Management (IPM): Combines biological, cultural, and chemical methods.
   - Beneficial Insects: Ladybugs for aphid control.

5️⃣ Fertilizers:
   - Organic: Manure, compost.
   - Inorganic: NPK fertilizers (Nitrogen, Phosphorus, Potassium).

6️⃣ Seasonal Crops:
   - Summer: Maize, Cotton.
   - Winter: Wheat, Mustard.
   - Rainy: Rice, Sugarcane.

7️⃣ Smart Farming Tools:
   - Drones: Field monitoring.
   - IoT Sensors: Soil moisture and temperature tracking.

🌱 Tips for Beginners:
   - Start small with easy-to-grow crops.
   - Maintain a farming journal.
   - Test soil before planting.
`;

  const downloadCheatSheet = () => {
    const doc = new jsPDF();
    doc.setFont("Courier", "normal");
    doc.text(cheatSheetContent, 10, 10);
    doc.save("agriculture-cheatsheet.pdf");
  };

  return (
    <div style={styles.container}>
      <section style={styles.content}>
        <h1 style={styles.title}>Agriculture Cheat Sheet</h1>
        <p style={styles.description}>
          Below is a quick reference guide to essential agricultural practices and tips.
        </p>
        <div style={styles.cheatSheetView}>
          <pre style={styles.cheatSheetText}>{cheatSheetContent}</pre>
        </div>
        <button style={styles.button} onClick={downloadCheatSheet}>
          Download PDF
        </button>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "lightblue",
    minHeight: "100vh",
    textAlign: "center",
    padding: "20px",
  },
  content: {
    marginTop: "50px",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    margin: "20px 0",
  },
  cheatSheetView: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "15px",
    margin: "20px auto",
    textAlign: "left",
    maxWidth: "800px",
    overflowX: "auto",
  },
  cheatSheetText: {
    whiteSpace: "pre-wrap",
    fontFamily: "Courier, monospace",
    fontSize: "1rem",
    color: "#333",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CheatSheetPage;
