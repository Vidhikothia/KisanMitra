import React, { useState } from "react";

const RegisterPage = () => {
  const countriesData = [
    { name: "USA", states: ["California", "Texas", "New York"] },
    { name: "India", states: ["Maharashtra", "Delhi", "Tamil Nadu"] },
    { name: "Canada", states: ["Ontario", "Quebec", "British Columbia"] },
  ];

  const [countries, setCountries] = useState(countriesData);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [language, setLanguage] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCountryChange = (event) => {
    const selectedCountryName = event.target.value;
    setSelectedCountry(selectedCountryName);

    const country = countries.find((country) => country.name === selectedCountryName);

    if (country) {
      setStates(country.states);
      setCities([]);
      setSelectedState("");
    } else {
      setStates([]);
    }
  };

  const handleStateChange = (event) => {
    const selectedStateName = event.target.value;
    setSelectedState(selectedStateName);

    if (selectedStateName) {
      setCities(["City 1", "City 2", "City 3"]);
    } else {
      setCities([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted");
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Register</h2>

        {/* First Name and Last Name */}
        <div style={styles.row}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Language and Role */}
        <div style={styles.row}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Country and State */}
        <div style={styles.row}>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            style={styles.input}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={handleStateChange}
            style={styles.input}
            disabled={!states.length}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City and Email */}
        <div style={styles.row}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={styles.input}
            disabled={!cities.length}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Phone Number and Password */}
        <div style={styles.row}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Confirm Password */}
        <div style={styles.row}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Register Button */}
        <button type="submit" style={styles.registerButton}>
          Register
        </button>

        {/* Already have an account */}
        <p>
          Already have an account?{" "}
          <a href="/login" style={styles.loginLink}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f4f8",
    padding: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "900px", // Increased width for landscape layout
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
    fontSize: "2rem",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  },
  input: {
    width: "48%",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#fafafa",
  },
  registerButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
  loginLink: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default RegisterPage;
