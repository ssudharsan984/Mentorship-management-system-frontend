// src/components/Assignments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://mentorship-management-system-backend-1.onrender.com/api/tasks")      // FIXED URL
      .then((res) => setAssignments(res.data))
      .catch((err) => {
        console.error("Error loading assignments", err);
        setError("Failed to load assignments");
      });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Mentor–Mentee Assignments</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mentor ID</th>
            <th>Mentee ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.mentorId}</td>
              <td>{a.menteeId}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assignments;
