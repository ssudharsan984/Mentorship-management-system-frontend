// src/components/Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card">
          <h3>Total Mentors</h3>
          <p>12</p>
        </div>
        <div className="card">
          <h3>Total Mentees</h3>
          <p>40</p>
        </div>
        <div className="card">
          <h3>Active Sessions</h3>
          <p>5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
