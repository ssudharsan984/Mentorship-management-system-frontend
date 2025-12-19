// src/components/Register.jsx
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [role, setRole] = useState("mentor");
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    usn: "",
    semester: "",
    mentorId: "",
    photoUrl: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      department: "",
      email: "",
      usn: "",
      semester: "",
      mentorId: "",
      photoUrl: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (role === "mentor") {
      axios
        .post("https://mentorship-management-system-backend-1.onrender.com/api/register/mentor", {
          name: form.name,
          department: form.department,
          email: form.email,
          photoUrl: form.photoUrl
        })
        .then(() => {
          setMessage("Mentor registered successfully.");
          resetForm();
        })
        .catch(() => setMessage("Error registering mentor."));
    } else {
      axios
        .post("https://mentorship-management-system-backend-1.onrender.com/api/register/mentee", {
          name: form.name,
          usn: form.usn,
          semester: form.semester,
          mentorId: form.mentorId,
          photoUrl: form.photoUrl
        })
        .then(() => {
          setMessage("Mentee registered successfully.");
          resetForm();
        })
        .catch(() => setMessage("Error registering mentee."));
    }
  };

  return (
    <div className="page-card">
      <h2>Register Mentor / Mentee</h2>
      <p style={{ marginTop: "0.4rem", color: "#6b7280" }}>
        Create new mentor or mentee records in the system.
      </p>

      {message && (
        <div
          style={{
            marginTop: "0.6rem",
            marginBottom: "0.6rem",
            padding: "0.4rem 0.6rem",
            borderRadius: 6,
            background: "#ecfdf3",
            color: "#166534",
            fontSize: "0.85rem"
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div style={{ marginBottom: "0.8rem" }}>
          <label>
            Role:&nbsp;
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="mentor">Mentor</option>
              <option value="mentee">Mentee</option>
            </select>
          </label>
        </div>

        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        {role === "mentor" && (
          <>
            <label>
              Department
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        {role === "mentee" && (
          <>
            <label>
              USN / Roll No
              <input
                name="usn"
                value={form.usn}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Semester
              <input
                name="semester"
                value={form.semester}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Mentor ID (optional)
              <input
                name="mentorId"
                value={form.mentorId}
                onChange={handleChange}
              />
            </label>
          </>
        )}

        <label>
          Photo URL (optional)
          <input
            name="photoUrl"
            value={form.photoUrl}
            onChange={handleChange}
          />
        </label>

        <button type="submit" style={{ marginTop: "0.8rem" }}>
          Register {role === "mentor" ? "Mentor" : "Mentee"}
        </button>
      </form>
    </div>
  );
}

export default Register;
