// src/components/Tasks.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    mentorId: "",
    menteeId: "",
    dueDate: "",
    maxMarks: ""
  });
  const [marksForm, setMarksForm] = useState({
    taskId: "",
    obtainedMarks: "",
    remarks: ""
  });

  const loadTasks = () => {
    axios
      .get("https://mentorship-management-system-backend-1.onrender.com/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error loading tasks", err));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("https://mentorship-management-system-backend-1.onrender.com/api/tasks", form)
      .then(() => {
        setForm({
          title: "",
          description: "",
          mentorId: "",
          menteeId: "",
          dueDate: "",
          maxMarks: ""
        });
        loadTasks();
      })
      .catch((err) => console.error("Error creating task", err));
  };

  const handleMarksChange = (e) =>
    setMarksForm({ ...marksForm, [e.target.name]: e.target.value });

  const handleSaveMarks = async (e) => {
    e.preventDefault();
    
    if (!marksForm.taskId || !marksForm.obtainedMarks) {
      alert("❌ Please fill in Task ID and Obtained Marks");
      return;
    }

    try {
      console.log('Saving marks for task:', marksForm.taskId);
      
      const response = await axios.patch(
        `https://mentorship-management-system-backend-1.onrender.com/api/tasks/${marksForm.taskId}/marks`,
        {
          obtainedMarks: Number(marksForm.obtainedMarks),
          remarks: marksForm.remarks
        }
      );
      
      console.log('Marks saved successfully:', response.data);
      
      alert(`✅ Marks saved successfully!\nTask ${marksForm.taskId}: ${marksForm.obtainedMarks} marks\nRemarks: ${marksForm.remarks || 'None'}`);
      
      setMarksForm({ taskId: "", obtainedMarks: "", remarks: "" });
      loadTasks();
    } catch (err) {
      console.error("Error saving marks:", err);
      
      if (err.response && err.response.status === 404) {
        alert(`❌ Task ID ${marksForm.taskId} not found!\nPlease check the Task ID from the table above.`);
      } else {
        alert(`❌ Failed to save marks: ${err.message}`);
      }
    }
  };

  return (
    <div className="page-card">
      <h2>Project / Assignment Tasks</h2>
      <p style={{ marginTop: "0.4rem", color: "#6b7280" }}>
        Mentors assign work to mentees and record their marks.
      </p>

      {/* form: create new assignment */}
      <form className="register-form" onSubmit={handleCreate}>
        <h3>Create New Task</h3>
        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mentor ID
          <input
            name="mentorId"
            value={form.mentorId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mentee ID
          <input
            name="menteeId"
            value={form.menteeId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Due date
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Max marks
          <input
            name="maxMarks"
            value={form.maxMarks}
            onChange={handleChange}
            placeholder="e.g. 20"
          />
        </label>
        <button type="submit">Create Task</button>
      </form>

      {/* table: show all tasks with marks */}
      <table className="data-table" style={{ marginTop: "1.2rem" }}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Mentor</th>
            <th>Mentee</th>
            <th>Due</th>
            <th>Status</th>
            <th>Marks</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.mentorId}</td>
              <td>{t.menteeId}</td>
              <td>{t.dueDate}</td>
              <td>{t.status}</td>
              <td>
                {t.obtainedMarks != null
                  ? `${t.obtainedMarks}/${t.maxMarks}`
                  : `-/${t.maxMarks}`}
              </td>
              <td>{t.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* form: mentor updates marks for a task */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginTop: '20px',
        border: '2px solid #007bff'
      }}>
        <form className="register-form" onSubmit={handleSaveMarks}>
          <h3 style={{ color: '#007bff', marginBottom: '15px' }}>📊 Update Marks for Task</h3>
          
          <div style={{ background: '#e7f3ff', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>
            💡 <strong>Tip:</strong> Use Task ID from the table above (e.g., 1, 2, 14)
          </div>
          
          <label>
            📋 Task ID
            <input
              name="taskId"
              type="number"
              value={marksForm.taskId}
              onChange={handleMarksChange}
              placeholder="Enter Task ID (e.g., 14)"
              required
              style={{ padding: '10px', fontSize: '14px' }}
            />
          </label>
          
          <label>
            🎯 Obtained Marks
            <input
              name="obtainedMarks"
              type="number"
              value={marksForm.obtainedMarks}
              onChange={handleMarksChange}
              placeholder="Enter marks (e.g., 78)"
              min="0"
              required
              style={{ padding: '10px', fontSize: '14px' }}
            />
          </label>
          
          <label>
            💬 Remarks (Optional)
            <textarea
              name="remarks"
              value={marksForm.remarks}
              onChange={handleMarksChange}
              placeholder="Enter feedback (e.g., good work, needs improvement)"
              rows="3"
              style={{ padding: '10px', fontSize: '14px', resize: 'vertical' }}
            />
          </label>
          
          <button 
            type="submit"
            style={{
              background: '#28a745',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            💾 Save Marks
          </button>
        </form>
      </div>
    </div>
  );
}

export default Tasks;
