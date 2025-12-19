// src/components/MentorDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MentorDashboard() {
  const [mentorId, setMentorId] = useState(null);
  const [mentees, setMentees] = useState([]);
  const [allMentees, setAllMentees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // NEW

  const [newMentee, setNewMentee] = useState({
    name: "",
    usn: "",
    semester: "",
    photoUrl: ""
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    menteeId: "",
    dueDate: "",
    maxMarks: ""
  });

  const [menteeCredentials, setMenteeCredentials] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        navigate("/");
        return;
      }
      const user = JSON.parse(userStr);

      // ONLY mentors can see this page (admin/mentee blocked here)
      if (user.role !== "mentor") {
        navigate("/");
        return;
      }

      const mentorIdValue = user.mentorId; // should be 1 or 2
      setMentorId(mentorIdValue);

      // if mentorId is missing, do not stay stuck
      if (!mentorIdValue) {
        console.error("MentorDashboard: mentorId missing in user object");
        setLoading(false);
        return;
      }

      await loadData(mentorIdValue);
    };

    init();
  }, [navigate]);

  const loadData = async (mentorIdValue) => {
    try {
      setLoading(true);
      const [menteesRes, tasksRes] = await Promise.all([
        axios.get("https://mentorship-management-system-backend-1.onrender.com/api/mentees"),
        axios.get("https://mentorship-management-system-backend-1.onrender.com/api/tasks")
      ]);

      const menteesData = menteesRes.data || [];
      const tasksData = tasksRes.data || [];

      setAllMentees(menteesData);
      setMentees(menteesData.filter((m) => m.mentorId === mentorIdValue));
      setTasks(tasksData.filter((t) => t.mentorId === mentorIdValue));
    } catch (err) {
      console.error("MentorDashboard loadData error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMentee = async (e) => {
    e.preventDefault();
    if (!mentorId) return;

    try {
      const response = await axios.post("https://mentorship-management-system-backend-1.onrender.com/api/mentees", {
        ...newMentee,
        semester: Number(newMentee.semester),
        mentorId
      });

      if (response.data.success) {
        setMenteeCredentials(response.data.credentials);
        setNewMentee({ name: "", usn: "", semester: "", photoUrl: "" });
        await loadData(mentorId);
      }
    } catch (err) {
      console.error("Add mentee error:", err);
      alert('Failed to add mentee: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!mentorId) return;

    try {
      await axios.post("https://mentorship-management-system-backend-1.onrender.com/api/tasks", {
        ...newTask,
        mentorId,
        menteeId: Number(newTask.menteeId),
        maxMarks: newTask.maxMarks ? Number(newTask.maxMarks) : 10
      });

      setNewTask({
        title: "",
        description: "",
        menteeId: "",
        dueDate: "",
        maxMarks: ""
      });
      await loadData(mentorId);
    } catch (err) {
      console.error("Add task error:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mentorId) {
    // we tried to load but mentorId is missing or invalid
    return <div>No mentor id found for this user. Please log in again.</div>;
  }

  return (
    <div>
      <h3>Mentor Dashboard</h3>

      <h4>My Mentees</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>USN</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {mentees.map((m) => (
            <tr key={m._id}>
              <td>{m._id}</td>
              <td>{m.name}</td>
              <td>{m.usn}</td>
              <td>{m.semester}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Add New Mentee</h4>
      
      {menteeCredentials && (
        <div style={{
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#155724' }}>✅ Mentee Created Successfully!</h5>
          <p style={{ margin: '5px 0' }}><strong>Username:</strong> {menteeCredentials.username}</p>
          <p style={{ margin: '5px 0' }}><strong>Default Password:</strong> {menteeCredentials.defaultPassword}</p>
          <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#856404' }}>⚠️ Please share these credentials with the student. They can change the password after first login.</p>
          <button 
            onClick={() => setMenteeCredentials(null)}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      )}
      
      <form onSubmit={handleAddMentee}>
        <div>
          <label>Name: </label>
          <input
            value={newMentee.name}
            onChange={(e) =>
              setNewMentee({ ...newMentee, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>USN: </label>
          <input
            value={newMentee.usn}
            onChange={(e) =>
              setNewMentee({ ...newMentee, usn: e.target.value })
            }
            placeholder="e.g., 24EC164"
            required
          />
        </div>
        <div>
          <label>Semester: </label>
          <input
            type="number"
            min="1"
            max="8"
            value={newMentee.semester}
            onChange={(e) =>
              setNewMentee({ ...newMentee, semester: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Photo URL: </label>
          <input
            value={newMentee.photoUrl}
            onChange={(e) =>
              setNewMentee({ ...newMentee, photoUrl: e.target.value })
            }
          />
        </div>
        <button className="btn-primary" type="submit">
          Add Mentee
        </button>
      </form>

      <h4>Create Assignment / Task</h4>
      <form onSubmit={handleAddTask}>
        <div>
          <label>Title: </label>
          <input
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </div>
        <div>
          <label>Mentee: </label>
          <select
            value={newTask.menteeId}
            onChange={(e) =>
              setNewTask({ ...newTask, menteeId: e.target.value })
            }
          >
            <option value="">Select mentee</option>
            {mentees.map((m, index) => (
              <option key={m._id} value={index + 1}>
                {m.name} ({m.usn})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Due Date: </label>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />
        </div>
        <div>
          <label>Max Marks: </label>
          <input
            value={newTask.maxMarks}
            onChange={(e) =>
              setNewTask({ ...newTask, maxMarks: e.target.value })
            }
          />
        </div>
        <button className="btn-primary" type="submit">
          Create Task
        </button>
      </form>

      <h4>My Tasks</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Mentee</th>
            <th>Status</th>
            <th>Max Marks</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => {
            const mentee = allMentees.find((m) => m._id === t.menteeId || m.id === t.menteeId);
            return (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{mentee ? mentee.name : t.menteeId}</td>
                <td>{t.status}</td>
                <td>{t.maxMarks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MentorDashboard;
