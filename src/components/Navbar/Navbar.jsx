// frontend/src/components/Navbar/Navbar.jsx
import React from "react";
import {useNavigate} from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
                <a href="/login" onClick={handleLogout}>Logout</a>
            </div>
        </nav>
    );
}

export default Navbar;