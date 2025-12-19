import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";

function MenteeDashboard() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log('Dashboard user:', user);
    
    if (!user.username) {
      console.log('No user found, redirecting');
      navigate("/mentee-login");
      return;
    }
    
    // Set default profile immediately
    setProfile({
      _id: '1',
      name: 'John Student',
      usn: 'STU001',
      semester: 5,
      mentorId: 1,
      photoUrl: 'https://via.placeholder.com/48?text=JS'
    });

    // Set default tasks
    setTasks([
      {
        id: 1,
        title: 'Project Phase 1',
        description: 'Submit ER diagram',
        dueDate: '2024-12-31',
        status: 'Pending',
        maxMarks: 20,
        obtainedMarks: null,
        remarks: ''
      },
      {
        id: 14,
        title: 'Database Task',
        description: 'Create database design',
        dueDate: '2024-12-20',
        status: 'Submitted',
        maxMarks: 100,
        obtainedMarks: 78,
        remarks: 'Good work!'
      }
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/mentee-login");
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  if (!profile) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>🎓 Student Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowPasswordChange(true)}
            style={{ 
              padding: '8px 16px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Change Password
          </button>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 16px', 
              background: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h3>My Profile</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <strong>Name:</strong> {profile.name}
          </div>
          <div>
            <strong>USN:</strong> {profile.usn}
          </div>
          <div>
            <strong>Semester:</strong> {profile.semester}
          </div>
          <div>
            <strong>Mentor ID:</strong> {profile.mentorId}
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
      }}>
        <h3>My Tasks ({tasks.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Due Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{task.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{task.title}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{task.dueDate}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <select 
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      background: task.status === 'Completed' ? '#d4edda' : 
                                 task.status === 'Submitted' ? '#cce5ff' : '#fff3cd'
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {task.obtainedMarks !== null ? `${task.obtainedMarks}/${task.maxMarks}` : `-/${task.maxMarks}`}
                  {task.remarks && (
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      "{task.remarks}"
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showPasswordChange && (
        <ChangePassword onClose={() => setShowPasswordChange(false)} />
      )}
    </div>
  );
}

export default MenteeDashboard;