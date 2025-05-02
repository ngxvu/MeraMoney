import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../features/SignUp/SignUp.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import config from "../../config";
import Footer from "../Footer/Footer";

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}:${config.apiPort}${config.endpoints.signup}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Network response was not ok");
      }

      const data = await response.json();
      onSignUp(data);
      setSuccess("Sign-up successful! Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error.message || "Sign-up failed. Please try again.");
    }
  };

  return (
    <>
      <div className="banner-container">
        <header className="banner">
          <div className="logo-container">
            <img src={logo} alt="Logo" />
            <span className="logo-text">Meramoney</span>
          </div>
        </header>
      </div>
      <div className="signup-container">
        <p>
          Already have an account? <a href="/login" className="login-link">Login here!</a>
        </p>
        {error && <p className="error">{error}</p>}{" "}
        {success && <p className="success">{success}</p>}{" "}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      < Footer />
    </>
  );
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
};

export default SignUp;
