import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-menu">
                <button onClick={toggleDropdown} className="dropdown-toggle">
                    &#9776; {}
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <a href="/settings" onClick={(e) => { e.preventDefault(); navigate("/settings"); }}>Settings</a>
                        <a href="/login" onClick={handleLogout}>Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;