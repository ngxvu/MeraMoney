import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/finalcs50-meramoney.png";
import './Settings.scss';

function Settings() {
    const [profile, setProfile] = useState(null);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const fetchProfile = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://143.198.193.9:8989/profile', {
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
            const response = await fetch('http://143.198.193.9:8989/profile', {
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
            <div className="settings-banner-container">
                <header className="settings-banner">
                    <div className="settings-logo-container">
                        <img src={logo} alt="Logo"/>
                        <span className="logo-text">Meramoney</span>
                    </div>
                </header>
            </div>
            <div className="settings-content">
                <div className="settings-container">
                    <div className="profile-info">
                        <h2>Profile Information</h2>
                        <p>User Name: {profile.user_name}</p>
                    </div>
                    <h2>Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="User Name"
                            required
                        />
                        <button type="submit">Update</button>
                    </form>
                    <button className="back-button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default Settings;