import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafbfc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <nav style={{ 
        background: '#fff', 
        borderBottom: '1px solid #d0d7de',
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: '600',
            color: '#24292f'
          }}>
            Academic Portal
          </h1>
        </div>
      </nav>

      <main style={{ 
        maxWidth: '960px', 
        margin: '0 auto', 
        padding: '80px 24px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '600',
            color: '#24292f',
            marginBottom: '16px',
            letterSpacing: '-0.025em'
          }}>
            Student-Faculty Portal
          </h2>
          <p style={{ 
            fontSize: '20px', 
            color: '#656d76',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            Streamlined academic management system for educational institutions
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '32px',
          marginBottom: '48px'
        }}>
          <div style={{ 
            background: '#fff',
            border: '1px solid #d0d7de',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'left'
          }}>
            <div style={{ 
              width: '48px',
              height: '48px',
              background: '#0969da',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '20px'
            }}>
              📚
            </div>
            <h3 style={{ 
              fontSize: '20px',
              fontWeight: '600',
              color: '#24292f',
              marginBottom: '8px'
            }}>
              Faculty Access
            </h3>
            <p style={{ 
              color: '#656d76',
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              Manage courses, assignments, and student progress tracking
            </p>
            <Link 
              to="/mentor-login"
              style={{ 
                display: 'inline-block',
                background: '#0969da',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Faculty Login
            </Link>
          </div>

          <div style={{ 
            background: '#fff',
            border: '1px solid #d0d7de',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'left'
          }}>
            <div style={{ 
              width: '48px',
              height: '48px',
              background: '#1a7f37',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '20px'
            }}>
              🎓
            </div>
            <h3 style={{ 
              fontSize: '20px',
              fontWeight: '600',
              color: '#24292f',
              marginBottom: '8px'
            }}>
              Student Access
            </h3>
            <p style={{ 
              color: '#656d76',
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              View assignments, submit coursework, and track academic progress
            </p>
            <Link 
              to="/mentee-login"
              style={{ 
                display: 'inline-block',
                background: '#1a7f37',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Student Login
            </Link>
          </div>
        </div>

        <div style={{ 
          background: '#f6f8fa',
          border: '1px solid #d0d7de',
          borderRadius: '8px',
          padding: '16px 20px',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: '0 0 8px 0',
            fontSize: '14px',
            fontWeight: '500',
            color: '#656d76'
          }}>
            Demo Credentials
          </p>
          <code style={{ 
            fontSize: '12px',
            color: '#24292f',
            background: '#fff',
            padding: '2px 6px',
            borderRadius: '3px',
            marginRight: '16px'
          }}>
            Faculty: mentor1 / mentor123
          </code>
          <code style={{ 
            fontSize: '12px',
            color: '#24292f',
            background: '#fff',
            padding: '2px 6px',
            borderRadius: '3px'
          }}>
            Student: student1 / mentee123
          </code>
        </div>
      </main>
    </div>
  );
}

export default HomePage;