import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

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

    return (
        <div>
            <h1>Update Profile</h1>
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
    );
}

export default UpdateProfile;