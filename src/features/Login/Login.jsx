// FILE: Login.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../features/Login/styles.scss';
import logo from '../../assests/images/finalcs50-meramoney.png';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLoginSuccess = (data) => {
        const { accessToken, refreshToken } = data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        onLogin(data);
        setSuccess('Login successful!');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://143.198.193.9:8989/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            handleLoginSuccess(data);
        } catch (error) {
            setError('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </div>
    );
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;