// src/components/Mentees.jsx
import React, { useState } from "react";

const initialMentees = [
  { id: 1, name: "Anita", year: "2nd", mentor: "Dr. Sharma" },
  { id: 2, name: "Rahul", year: "3rd", mentor: "Prof. Rao" },
];

const Mentees = () => {
  const [mentees, setMentees] = useState(initialMentees);
  const [form, setForm] = useState({ name: "", year: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!form.name || !form.year) return;
    setMentees([
      ...mentees,
      { id: Date.now(), name: form.name, year: form.year, mentor: "Unassigned" },
    ]);
    setForm({ name: "", year: "" });
  };

  return (
    <div>
      <h2>Mentees</h2>
      <form className="form-inline" onSubmit={handleAdd}>
        <input
          type="text"
          name="name"
          placeholder="Mentee name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />
        <button type="submit">Add Mentee</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Mentee</th>
            <th>Year</th>
            <th>Mentor</th>
          </tr>
        </thead>
        <tbody>
          {mentees.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.year}</td>
              <td>{m.mentor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mentees;
