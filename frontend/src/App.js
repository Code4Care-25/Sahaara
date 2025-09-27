import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  InstitutionSelection,
  Login,
  ThemeSelection,
  Dashboard,
  CounsellorPage,
  AdminDashboard,
  ChatPage,
  AppointmentBooking,
  ResourceHub,
  PeerSupportForum,
  PersonalJournal,
} from "./components";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<InstitutionSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/theme-selection" element={<ThemeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/counsellor" element={<CounsellorPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/appointment" element={<AppointmentBooking />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/forum" element={<PeerSupportForum />} />
          <Route path="/journal" element={<PersonalJournal />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
