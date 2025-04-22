import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    contact: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Error signing up');
    }
  };

  const styles = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      fontFamily: 'sans-serif',
      marginTop:'50px'
    },
    wrapper: {
      height: '500px',
      width: '500px',
      background: 'lightblue',
      color: '#fff',
      borderRadius: '20px',
      padding: '30px 40px',
      border: '2px solid rgba(255,255,255, .2)',
      backdropFilter: 'blur(20px)',
    },
    h1: {
      fontSize: '36px',
      textAlign: 'center',
    },
    inputBox: {
      position: 'relative',
      width: '100%',
      height: '40px',
      margin: '30px 0',
    },
    input: {
      width: '100%',
      height: '100%',
      paddingLeft: '30px',
      background: 'transparent',
      border: '2px solid rgba(255,255,255, .2)',
      borderRadius: '40px',
      fontWeight: '600',
      color: '#fff',
      outline: 'none',
    },
    gender: {
      display: 'flex',
      fontSize: '14px',
      margin: '30px 0',
      gap: '20px',
    },
    btn: {
      width: '100%',
      height: '50px',
      borderRadius: '40px',
      border: 'none',
      boxShadow: '0 0 10px rgba(0,0,0,.1)',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#333',
      fontWeight: '600',
      marginTop: '10px',
    },
    login: {
      fontSize: '20px',
      textAlign: 'center',
      marginTop: '30px',
    },
    home: {
      position: 'absolute',
      top: 0,
      left: 0,
      margin: '20px',
    },
    backBtn: {
      background: 'transparent',
      color: 'azure',
      border: 'none',
      borderRadius: '10px',
      height: '50px',
      width: '105px',
      cursor: 'pointer',
      fontSize: '30px',
    },
    backLink: {
      textDecoration: 'none',
      color: 'white',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.home}>
        <Link to="/login" style={styles.backLink}>
          <button style={styles.backBtn}>❮ Back</button>
        </Link>
      </div>
      <div style={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1 style={styles.h1}>REGISTER</h1>
          
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <div style={styles.inputBox}>
            <input
              style={styles.input}
              type="text"
              name="username"
              placeholder="Email id"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputBox}>
            <input
              style={styles.input}
              type="text"
              name="contact"
              placeholder="contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.gender}>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              /> Female
            </label>
          </div>

          <button type="submit" style={styles.btn}>Submit</button>

          <div style={styles.login}>
            <p>
              Do you have an account? <Link to="/login" style={styles.backLink}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
