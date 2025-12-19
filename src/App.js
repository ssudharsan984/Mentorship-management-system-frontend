// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import HomePage from "./components/HomePage";
import MentorLogin from "./components/MentorLogin";
import MenteeLogin from "./components/MenteeLogin";
import MentorDashboard from "./components/MentorDashboard";
import MenteeDashboard from "./components/MenteeDashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import Assignments from "./components/Assignments";

function AppLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* home page with login options */}
        <Route path="/" element={<HomePage />} />
        
        {/* separate login pages */}
        <Route path="/mentor-login" element={<MentorLogin />} />
        <Route path="/mentee-login" element={<MenteeLogin />} />

        {/* mentor dashboard */}
        <Route
          path="/mentor-dashboard"
          element={
            <AppLayout>
              <MentorDashboard />
            </AppLayout>
          }
        />

        {/* mentee dashboard */}
        <Route
          path="/mentee-dashboard"
          element={
            <AppLayout>
              <MenteeDashboard />
            </AppLayout>
          }
        />

        {/* other pages */}
        <Route
          path="/register"
          element={
            <AppLayout>
              <Register />
            </AppLayout>
          }
        />
        <Route
          path="/tasks"
          element={
            <AppLayout>
              <Tasks />
            </AppLayout>
          }
        />
        <Route
          path="/assignments"
          element={
            <AppLayout>
              <Assignments />
            </AppLayout>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
