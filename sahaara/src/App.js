import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstitutionSelection from "./components/InstitutionSelection";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CounsellorPage from "./components/CounsellorPage";
import AdminDashboard from "./components/AdminDashboard";
import ChatPage from "./components/ChatPage";
import AppointmentBooking from "./components/AppointmentBooking";
import ResourceHub from "./components/ResourceHub";
import PeerSupportForum from "./components/PeerSupportForum";
import PersonalJournal from "./components/PersonalJournal";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<InstitutionSelection />} />
          <Route path="/login" element={<Login />} />
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
