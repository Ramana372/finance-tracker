import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const heroStyle = {
    backgroundImage: 'url(/images/backi.avif)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const contentStyle = {
    paddingLeft: '5rem',
    maxWidth: '50%',
    textAlign: 'left',
    color: 'white'
  };

  return (
    <div className="hero" style={heroStyle}>
      <div className="content" style={contentStyle}>
        <h1>"Money is like an Addiction; Don't Addict it leads to causes...."</h1>
        <Link 
          to="/Savings" 
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 25px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Explore Savings
        </Link>
      </div>
    </div>
  );
}

export default Home;
