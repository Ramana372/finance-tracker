import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          !event.target.classList.contains('user-pic')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.jpg" className="logo" alt="logo" />
      </Link>

      <div className="hamburger" onClick={toggleMobileMenu}>
        <i className={`fa ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}><i className="fa fa-home"></i> HOME</Link></li>
        <li><Link to="/income" onClick={() => setIsMobileMenuOpen(false)}><i className="fa fa-sack-dollar"></i> Income</Link></li>
        <li><Link to="/expense" onClick={() => setIsMobileMenuOpen(false)}><i className="fa fa-arrow-up-right-from-square"></i> Expense</Link></li>
        <li><Link to="/savings" onClick={() => setIsMobileMenuOpen(false)}><i className="fa fa-comments-dollar"></i>Savings</Link></li>
        {!currentUser && <li><Link to="/login" onClick={() => setIsMobileMenuOpen(false)}><i className="fa fa-user-plus"></i> Login</Link></li>}
      </ul>

      {currentUser && (
        <>
          <img 
            src="/images/imcome.jpg" 
            className="user-pic" 
            onClick={toggleMenu} 
            alt="user" 
          />
          <div 
            ref={menuRef}
            className={`sub-menu-wrap ${isMenuOpen ? 'open-menu' : ''}`} 
          >
            <div className="sub-menu">
              <div className="user-info">
                <img src="/images/imcome.jpg" alt="user" />
                <h3>{currentUser.username}</h3>
              </div>
              <hr />
              {/* <Link to="/Editprofile" className="sub-menu-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fa fa-user-plus"></i>
                <p>Edit Profile</p>
                <span> &gt; </span>
              </Link> */}
              <Link to="/Privacy" className="sub-menu-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fa fa-gears"></i>
                <p>Setting & Privacy</p>
                <span> &gt; </span>
              </Link>
              <Link to="/Help" className="sub-menu-link" onClick={() => setIsMenuOpen(false)}>
                <i className="fa fa-circle-info"></i>
                <p>Help & Support</p>
                <span> &gt; </span>
              </Link>
              <button className="sub-menu-link logout-btn" onClick={handleLogout}>
                <i className="fa fa-right-from-bracket"></i>
                <p>Logout</p>
                <span> &gt; </span>
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
