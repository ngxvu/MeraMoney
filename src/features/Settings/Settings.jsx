import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const [profile, setProfile] = useState(null);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        fetch('http://143.198.193.9:8989/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setProfile(data);
            setUserName(data.user_name);
        })
        .catch(error => {
            console.error('There was an error fetching the profile!', error);
        });
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
                throw new Error('Network response was not ok');
            }

            setSuccess('Profile updated successfully!');
        } catch (error) {
            setError('There was an error updating the profile.');
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Settings</h1>
            <div>
                <h2>View Profile</h2>
                <p>User Name: {profile.user_name}</p>
            </div>
            <div>
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
            </div>
        </div>
    );
}

export default Settings;