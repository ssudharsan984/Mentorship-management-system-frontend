import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", { username, password });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data));
        
        if (res.data.role === "mentor") navigate("/mentor-dashboard");
        else if (res.data.role === "mentee") navigate("/mentee-dashboard");
        else navigate("/mentor-dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError("Connection failed. Start backend server.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🎓 Login</h2>
        
        <div style={{ background: '#e8f5e8', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '13px' }}>
          <strong>Credentials:</strong><br/>
          admin/admin123 | mentor1/mentor123 | student1/mentee123
        </div>

        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '8px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
          </div>
          
          <button 
            type="submit"
            style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;