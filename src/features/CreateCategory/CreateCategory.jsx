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
        const savedName = params.get('name');
        const savedDescription = params.get('description');
        const savedType = params.get('type');

        if (selectedIconId) {
            setIconId(selectedIconId);
            setIconUrl(selectedIconUrl);
        }
        if (savedName) {
            setName(savedName);
        }
        if (savedDescription) {
            setDescription(savedDescription);
        }
        if (savedType) {
            setType(savedType);
        }
    }, [location]);
    
    const handleSelectIcon = () => {
        localStorage.setItem('name', name);
        localStorage.setItem('description', description);
        localStorage.setItem('type', type);
        navigate(`/list-icon-catalog?name=${name}&description=${description}&type=${type}`);
    };
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const selectedIconId = params.get('icon_id');
        const selectedIconUrl = params.get('icon_url');
        const savedName = params.get('name') || localStorage.getItem('name');
        const savedDescription = params.get('description') || localStorage.getItem('description');
        const savedType = params.get('type') || localStorage.getItem('type');
        
        if (selectedIconId) {
            setIconId(selectedIconId);
            setIconUrl(selectedIconUrl);
        }
        if (savedName) {
            setName(savedName);
        }
        if (savedDescription) {
            setDescription(savedDescription);
        }
        if (savedType) {
            setType(savedType);
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

            navigate('/view-categories');
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
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="income">Income</option>
                            <option value="expenses">Expenses</option>
                        </select>
                        <button type="button" onClick={handleSelectIcon}>Select Icon</button>
                        {iconUrl && <img src={iconUrl} alt="Selected Icon" className="selected-icon"/>}
                        <button type="submit">Create</button>
                    </form>
                </div>
                <button onClick={() => navigate('/category')} className="create-button">Back</button>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default CreateCategory;