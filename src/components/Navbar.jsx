import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar-title">Mentorship Portal</div>
      <div className="navbar-links">
        <Link to="/mentor-dashboard">Mentor</Link>
        <Link to="/mentee-dashboard">Mentee</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/register">Register</Link>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "16px",
            background: "transparent",
            border: "1px solid #e5e7eb",
            color: "#e5e7eb",
            padding: "4px 8px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
