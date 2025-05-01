import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from "../../config";

function Profile() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        console.log('Retrieved Access Token:', accessToken); // Debugging
        if (!accessToken) {
            navigate('/login');
            return;
        }

        fetch(`${config.apiBaseUrl}:${config.apiPort}/profile`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            console.log('Response Status:', response.status); // Debugging
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Profile Data:', data); // Debugging
            setProfile(data);
        })
        .catch(error => {
            console.error('There was an error fetching the profile!', error);
        });
    }, [navigate]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>User Name: {profile.user_name}</p>
        </div>
    );
}

export default Profile;