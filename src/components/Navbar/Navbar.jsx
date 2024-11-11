import React from "react";
import "./Navbar.scss";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
                <a href="/logout">Logout</a>
            </div>
        </nav>
    );
}

export default Navbar;
