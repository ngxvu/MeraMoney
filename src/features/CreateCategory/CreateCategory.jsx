// src/features/CreateCategory/CreateCategory.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreateCategory.scss';
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";

function CreateCategory() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('income');
    const [iconId, setIconId] = useState('');
    const [iconUrl, setIconUrl] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const selectedIconId = params.get('icon_id');
        const selectedIconUrl = params.get('icon_url');
        if (selectedIconId) {
            setIconId(selectedIconId);
            setIconUrl(selectedIconUrl);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        const categoryData = {
            name,
            description,
            type,
            icon_id: parseInt(iconId, 10)
        };

        try {
            const response = await fetch('http://143.198.193.9:8989/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(categoryData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/list-categories');
        } catch (error) {
            console.error('There was an error creating the category!', error);
        }
    };

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
            <div className="create-category-page">
                <div className="create-category">
                    <h2>CREATE CATEGORY</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="income">Income</option>
                                <option value="expenses">Expenses</option>
                            </select>
                        
                            {iconUrl && <img src={iconUrl} alt="Selected Icon" className="selected-icon"/>}
                            
                            <button type="button" onClick={() => navigate('/list-icon-catalog')}>Select Icon</button>
                            <button type="submit">Create</button>
                    </form>
                </div>
                <button onClick={() => navigate('/category')}>Back</button>
            </div>
        </>
    );
}

export default CreateCategory;