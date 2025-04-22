import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Income from './components/Income';
import Expenses from './components/Expenses';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import Savings from './components/Savings';
import './App.css';
import Help from './components/Help';
import Privacy from './components/Privacy';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expenses />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/Help" element={<Help />} />
            <Route path="/Privacy" element={<Privacy />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
