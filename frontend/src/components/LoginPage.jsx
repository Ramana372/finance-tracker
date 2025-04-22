import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      login(response.data.user);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Error logging in');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'url(/images/back2.jpg)',
      fontFamily: 'sans-serif',
      position: 'relative',
       marginTop:'50px'
    }}>
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <button style={{
            background: 'lightblue',
            color: 'azure',
            border: 'none',
            borderRadius: '10px',
            height: '50px',
            width: '105px',
            cursor: 'pointer',
            fontSize: '30px',
            transition: 'box-shadow 0.15s'
          }}>❮ Back</button>
        </Link>
      </div>

      <div style={{
        width: '500px',
        background: 'lightblue',
        color: '#fff',
        borderRadius: '20px',
        padding: '30px 40px',
        border: '2px solid rgba(255,255,255, .2)',
        backdropFilter: 'blur(20px)'
      }}>
        <form onSubmit={handleLogin}>
          <h1 style={{ fontSize: '36px', textAlign: 'center' }}>LOGIN</h1>
          
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <div style={{ position: 'relative', width: '100%', height: '60px', margin: '30px 0' }}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                background: 'lightblue',
                border: '2px solid rgba(255,255,255, .2)',
                borderRadius: '40px',
                paddingLeft: '30px',
                color: '#fff',
                fontWeight: 600,
                outline: 'none',
              }}
            />
          </div>

          <div style={{ position: 'relative', width: '100%', height: '60px', margin: '30px 0' }}>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                background: 'lightblue',
                border: '2px solid rgba(255,255,255, .2)',
                borderRadius: '40px',
                paddingLeft: '30px',
                color: '#fff',
                fontWeight: 600,
                outline: 'none',
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            height: '50px',
            borderRadius: '40px',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#333',
            fontWeight: 600,
            marginTop: '20px'
          }}>Submit</button>

          <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '45px' }}>
            <p>Don't have an account? <Link to="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
