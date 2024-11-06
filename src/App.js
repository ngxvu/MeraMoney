import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/Login/Login';
import SignUp from './features/SignUp/SignUp';
import Dashboard from './features/Dashboard/Dashboard';

function App() {
  const handleLogin = () => {
  };

  const handleSignUp = () => {
  };


  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}