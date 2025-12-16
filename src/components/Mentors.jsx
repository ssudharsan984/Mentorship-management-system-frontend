// src/components/Mentors.jsx
import React, { useState } from "react";

const initialMentors = [
  { id: 1, name: "Dr. Sharma", domain: "AI", menteeCount: 3 },
  { id: 2, name: "Prof. Rao", domain: "Web Development", menteeCount: 5 },
];

const Mentors = () => {
  const [mentors, setMentors] = useState(initialMentors);
  const [form, setForm] = useState({ name: "", domain: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!form.name || !form.domain) return;
    setMentors([
      ...mentors,
      { id: Date.now(), name: form.name, domain: form.domain, menteeCount: 0 },
    ]);
    setForm({ name: "", domain: "" });
  };

  return (
    <div>
      <h2>Mentors</h2>
      <form className="form-inline" onSubmit={handleAdd}>
        <input
          type="text"
          name="name"
          placeholder="Mentor name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="domain"
          placeholder="Domain"
          value={form.domain}
          onChange={handleChange}
        />
        <button type="submit">Add Mentor</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Mentor</th>
            <th>Domain</th>
            <th>Mentees</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.domain}</td>
              <td>{m.menteeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mentors;
