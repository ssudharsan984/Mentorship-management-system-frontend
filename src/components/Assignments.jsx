// src/components/Assignments.jsx
import React, { useState } from "react";

const dummyMentors = [
  { id: 1, name: "Dr. Sharma" },
  { id: 2, name: "Prof. Rao" },
];

const dummyMentees = [
  { id: 1, name: "Anita" },
  { id: 2, name: "Rahul" },
];

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");

  const handleAssign = e => {
    e.preventDefault();
    if (!mentorId || !menteeId) return;

    const mentor = dummyMentors.find(m => String(m.id) === mentorId);
    const mentee = dummyMentees.find(m => String(m.id) === menteeId);

    setAssignments([
      ...assignments,
      { id: Date.now(), mentor: mentor.name, mentee: mentee.name },
    ]);
    setMentorId("");
    setMenteeId("");
  };

  return (
    <div>
      <h2>Assignments</h2>
      <form className="form-inline" onSubmit={handleAssign}>
        <select value={mentorId} onChange={e => setMentorId(e.target.value)}>
          <option value="">Select mentor</option>
          {dummyMentors.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <select value={menteeId} onChange={e => setMenteeId(e.target.value)}>
          <option value="">Select mentee</option>
          {dummyMentees.map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <button type="submit">Assign</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Mentor</th>
            <th>Mentee</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a.id}>
              <td>{a.mentor}</td>
              <td>{a.mentee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
