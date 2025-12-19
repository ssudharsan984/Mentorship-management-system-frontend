import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/mentor-dashboard">Mentor Dashboard</Link>
        </li>
        <li>
          <Link to="/mentee-dashboard">Mentee Dashboard</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/assignments">Assignments</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
