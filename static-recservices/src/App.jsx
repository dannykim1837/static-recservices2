import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import CalendarPage from './pages/calendar';
import IndexPage from './pages/index';
import KioskPage from './pages/kiosk';
import SettingsPage from './pages/settings';
import UserProfilePage from './pages/userProfile';
import TestHTTPPage from './pages/testHTTP';
import TimeClockPage from './pages/timeClock';
import CreateEventPage from './pages/createEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/kiosk" element={<KioskPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/test-http" element={<TestHTTPPage />} />
        <Route path="/time-clock" element={<TimeClockPage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
