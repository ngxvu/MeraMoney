// FILE: Login.jsx
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import "../../features/Login/Login.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";

function Login({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    
    const handleLoginSuccess = (data) => {
        const {accessToken, refreshToken} = data;
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        onLogin(data);
        setSuccess("Login successful!");
        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        
        try {
            const response = await fetch("http://143.198.193.9:8989/login", {
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
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            handleLoginSuccess(data);
        } catch (error) {
            setError("Login failed. Please check your username and password.");
        }
    };
    
    return (
        <>
            <div className="login-banner-container">
                <header className="login-banner">
                    <div className="login-logo-container">
                        <img src={logo} alt="Logo"/>
                        <span className="logo-text">Meramoney</span>
                    </div>
                </header>
            </div>
            <div className="login-container">
                <h2>Login to Meramoney</h2>
                <p>
                    Don't have an account yet? <a href="/signup">Sign up here!</a>
                </p>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
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
                    <button type="submit">Login</button>
                </form>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;