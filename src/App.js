import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Auth from './pages/Auth';
import ResetPassword from './pages/ResetPassword';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import PlayerDashboard from './pages/PlayerDashboard';
import DashboardP from './pages/DashboardP';
import Quizzes from './pages/Quizzes';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="auth" element={<Auth />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="quizzes" element={<Quizzes />} />
          {/* Nested routes for PlayerDashboard */}
          <Route path="player-dashboard" element={<PlayerDashboard />}>
            {/* default child route (index) renders DashboardP */}
            <Route index element={<DashboardP />} />
            {/* add other nested routes here if needed */}
          </Route>

          {/* fallback or 404 can go here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
