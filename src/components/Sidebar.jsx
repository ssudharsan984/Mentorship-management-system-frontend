// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open }) => {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <nav>
        <NavLink to="/dashboard" className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/mentors" className="sidebar-link">
          Mentors
        </NavLink>
        <NavLink to="/mentees" className="sidebar-link">
          Mentees
        </NavLink>
        <NavLink to="/assignments" className="sidebar-link">
          Assignments
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
