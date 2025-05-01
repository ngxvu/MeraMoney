import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/finalcs50-meramoney.png";
import './Settings.scss';
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";
import Footer from "../Footer/Footer";

function Settings() {
    const [profile, setProfile] = useState(null);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${config.apiBaseUrl}:${config.apiPort}/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProfile(data);
            setUserName(data.user_name);
        } catch (error) {
            console.error('There was an error fetching the profile!', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`${config.apiBaseUrl}:${config.apiPort}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ user_name: userName })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Network response was not ok');
            }

            setSuccess('Profile updated successfully!');
            await fetchProfile(); // Refresh profile data
        } catch (error) {
            setError(error.message || 'There was an error updating the profile.');
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="navbar-banner-container">
                <header className="navbar-banner">
                    <div className="navbar-logo-container">
                        <img src={logo} alt="Logo"/>
                        <span className="navbar-logo-text">Meramoney</span>
                    </div>
                    <Navbar/>
                </header>
            </div>
            <div className="settings-content">
                <div className="settings-container">
                    <div className="profile-info">
                        <i className="fas fa-user user-icon" onClick={() => setShowUpdateForm(!showUpdateForm)}></i>
                        <p className="profile-username">{profile.user_name}</p>
                    </div>
                    {showUpdateForm && (
                        <div className="update-profile">
                            <h2>UPDATE PROFILE</h2>
                            <form onSubmit={handleSubmit}>
                                {error && <div className="error-message">{error}</div>}
                                {success && <div className="success-message">{success}</div>}
                                <input
                                    type="text"
                                    id="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="New Username"
                                    required
                                />
                                <button type="submit">Update</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            < Footer />
        </>
    );
}

export default Settings;