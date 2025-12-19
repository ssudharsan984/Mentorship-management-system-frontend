import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function MenteeLogin() {
  const [username, setUsername] = useState("student1");
  const [password, setPassword] = useState("mentee123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log('Attempting student login:', username);
      const res = await axios.post("https://mentorship-management-system-backend-1.onrender.com/api/login", { username, password });
      console.log('Login response:', res.data);

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data));
        console.log('Stored user data:', res.data);
        navigate("/mentee-dashboard");
      } else {
        setError("Login failed: " + res.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("Server connection failed");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          🎓 Student Login
        </h2>

        {error && (
          <div style={{ 
            background: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
              required
            />
          </div>
          
          <button 
            type="submit"
            style={{ 
              width: '100%',
              padding: '12px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login as Student
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/mentor-login" style={{ color: '#2196F3', textDecoration: 'none' }}>
            Faculty Login →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenteeLogin;
