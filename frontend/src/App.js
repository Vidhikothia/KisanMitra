import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <Router>
      <Routes>
        <Route path="/userform" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
