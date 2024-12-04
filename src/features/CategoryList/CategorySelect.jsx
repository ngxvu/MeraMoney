import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CategorySelect.scss';
import logo from "../../assets/images/finalcs50-meramoney.png";
import all from "../../assets/images/meramoney.png";
import Navbar from "../../components/Navbar/Navbar";

function CategorySelect() {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCategories = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://143.198.193.9:8989/category?page=1&page_size=15', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('There was an error fetching the categories!', error);
            }
        };

        fetchCategories();
    }, [navigate]);

    const handleSelectCategory = (categoryId) => {
        setCategoryId(categoryId);
        if (location.state && location.state.onSelectCategory) {
            const onSelectCategory = new Function('categoryId', location.state.onSelectCategory);
            onSelectCategory(categoryId);
        }
        navigate('/transaction-history', { state: { selectedCategoryId: categoryId, dateRange: location.state.dateRange, typeFilter: location.state.typeFilter } });
    };

    return (
        <>
            <div className="banner-container">
                <header className="banner">
                    <div className="logo-container">
                        <img src={logo} alt="Logo"/>
                        <span className="logo-text">Meramoney</span>
                    </div>
                </header>
            </div>
            <div className="category-select-page">
                <div className="category-list">
                    <div className="category-item" onClick={() => handleSelectCategory('')}>
                        <img src={all} alt="all"/>
                        <span>All</span>
                    </div>
                    {categories.map(category => (
                        <div key={category.id}
                             className={`category-item ${categoryId === category.id ? 'selected' : ''}`}
                             onClick={() => handleSelectCategory(category.id)}>
                            <img src={category.icon_catalog_image_url} alt={category.name}/>
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default CategorySelect;