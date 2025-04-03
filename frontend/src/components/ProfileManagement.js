import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import axios from 'axios';
import './ManageFProfile.css';

const ProfileManagement = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  // Fetch user data when component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseid = await axios.get('http://localhost:5000/auth/profile', { withCredentials: true });
        const id = responseid.data.user._id;
        const response = await axios.get(`http://localhost:5000/auth/user/${id}`, { withCredentials: true });
        const data = response.data;

        setUsername(data.username);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);

        const country = Country.getAllCountries().find(c => c.name === data.country);
        if (country) {
          setSelectedCountry({ value: country.isoCode, label: country.name });

          const state = State.getStatesOfCountry(country.isoCode).find(s => s.name === data.state);
          if (state) {
            setSelectedState({ value: state.isoCode, label: state.name });

            const city = City.getCitiesOfState(country.isoCode, state.isoCode).find(c => c.name === data.city);
            if (city) {
              setSelectedCity({ value: city.name, label: city.name });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Prepare country options
  const countryOptions = useMemo(() => 
    Country.getAllCountries().map(country => ({
      value: country.isoCode,
      label: country.name
    })), 
    []
  );

  // Prepare state options based on selected country
  const stateOptions = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry.value).map(state => ({
      value: state.isoCode,
      label: state.name
    }));
  }, [selectedCountry]);

  // Prepare city options based on selected state
  const cityOptions = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];
    return City.getCitiesOfState(selectedCountry.value, selectedState.value).map(city => ({
      value: city.name,
      label: city.name
    }));
  }, [selectedCountry, selectedState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !phone_number || !selectedCountry || !selectedState || !selectedCity) {
      alert('Please fill in all fields');
      return;
    }

    const formData = {
      username,
      email,
      phone_number,
      country: selectedCountry.label,
      state: selectedState.label,
      city: selectedCity.label,
    };

    try {
      await axios.put(`http://localhost:5000/auth/user/update`, formData, { withCredentials: true });

      alert('Profile updated successfully!');
      navigate('/'); // Navigate to home page after successful update
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div 
        className="popup-content" 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
      >
        <button className="close-button" onClick={handleClose}>×</button>
        <div className="profile-management-wrapper">
          <div className="profile-management-header">
            <h1>Manage Your Profile</h1>
            <p>Update your personal information</p>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  id="email"
                  type="email"
                  value={email}
                  readOnly
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  id="phone"
                  type="tel"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <Select
                  value={selectedCountry}
                  onChange={(selected) => {
                    setSelectedCountry(selected);
                    setSelectedState(null);
                    setSelectedCity(null);
                  }}
                  options={countryOptions}
                  placeholder="Select Country"
                  isSearchable={true}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>State</label>
                <Select
                  value={selectedState}
                  onChange={(selected) => {
                    setSelectedState(selected);
                    setSelectedCity(null);
                  }}
                  options={stateOptions}
                  placeholder={selectedCountry ? "Select State" : "Select Country First"}
                  isSearchable={true}
                  isDisabled={!selectedCountry}
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <Select
                  value={selectedCity}
                  onChange={setSelectedCity}
                  options={cityOptions}
                  placeholder={selectedState ? "Select City" : "Select State First"}
                  isSearchable={true}
                  isDisabled={!selectedState}
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;