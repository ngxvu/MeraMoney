// FILE: frontend/src/features/Logout/Logout.jsx
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };
    
    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;