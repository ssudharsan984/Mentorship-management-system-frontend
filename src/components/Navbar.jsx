// src/components/Navbar.jsx
import React from "react";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="navbar">
      <button className="navbar-toggle" onClick={onToggleSidebar}>
        ☰
      </button>
      <h1 className="navbar-title">Mentorship Management System</h1>
      <div className="navbar-right">
        <span className="navbar-user">Admin</span>
      </div>
    </header>
  );
};

export default Navbar;
