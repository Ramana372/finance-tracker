import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Privacy.css';

const Privacy = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const [email, setEmail] = useState(currentUser.email);
  const [username, setUsername] = useState(currentUser.username);
  const [password, setPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false); // Example for 2FA

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({ email, username, password });
    alert('Profile updated successfully!');
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Add logic to enable/disable two-factor authentication
    alert(`Two-Factor Authentication is now ${!twoFactorEnabled ? 'enabled' : 'disabled'}.`);
  };

  return (
    <div className="settings-privacy-container">
      <h1>Settings & Privacy</h1>
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password (leave blank to keep current)</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit" className="submit-button">Update Profile</button>
      </form>

      <div className="two-factor-auth">
        <h2>Two-Factor Authentication</h2>
        <p>Enable additional security for your account.</p>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={twoFactorEnabled} 
            onChange={handleTwoFactorToggle} 
          />
          <span className="slider"></span>
        </label>
        <span>{twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
      </div>
    </div>
  );
};

export default Privacy;
