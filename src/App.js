// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Mentors from "./components/Mentors";
import Mentees from "./components/Mentees";
import Assignments from "./components/Assignments";
import "./index.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="app-body">
          <Sidebar open={sidebarOpen} />
          <main className={`app-content ${sidebarOpen ? "" : "expanded"}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/mentees" element={<Mentees />} />
              <Route path="/assignments" element={<Assignments />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
