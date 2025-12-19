import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function MentorLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://mentorship-management-system-backend-1.onrender.com/api/login", formData);

      if (response.data.success && response.data.role === "mentor") {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/mentor-dashboard");
      } else {
        setError("Access denied. Faculty credentials required.");
      }
    } catch (err) {
      setError("Connection failed. Please verify server status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafbfc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        background: '#fff',
        border: '1px solid #d0d7de',
        borderRadius: '12px',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 24px rgba(140, 149, 159, 0.2)'
      }}>
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ 
            width: '64px',
            height: '64px',
            background: '#0969da',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '24px'
          }}>
            📚
          </div>
          <h2 style={{ 
            fontSize: '24px',
            fontWeight: '600',
            color: '#24292f',
            marginBottom: '8px'
          }}>
            Faculty Login
          </h2>
          <p style={{ 
            color: '#656d76',
            fontSize: '14px'
          }}>
            Access your teaching dashboard
          </p>
        </div>

        {error && (
          <div style={{ 
            background: '#ffebe9',
            border: '1px solid #fd2c2c',
            color: '#d1242f',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#24292f'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              style={{ 
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d7de',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#24292f'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              style={{ 
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d0d7de',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              required
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%',
              padding: '10px',
              background: loading ? '#8c959f' : '#0969da',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div style={{ 
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #d0d7de',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#656d76',
            fontSize: '14px',
            marginBottom: '8px'
          }}>
            Student access?
          </p>
          <Link 
            to="/mentee-login"
            style={{ 
              color: '#0969da',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Go to Student Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MentorLogin;
