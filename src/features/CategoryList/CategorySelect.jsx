// src/features/CategorySelect/CategorySelect.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategorySelect.scss';

function CategorySelect() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

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
        navigate('/transaction-history', { state: { selectedCategoryId: categoryId } });
    };

    return (
        <div className="category-select-page">
            <button onClick={() => navigate('/transaction-history')}>Back</button>
            <div className="category-list">
                <div className="category-item">
                    <p>All</p>
                    <button onClick={() => handleSelectCategory(null)}>Select</button>
                </div>
                {categories.map(category => (
                    <div key={category.id} className="category-item">
                        <img src={category.icon_catalog_image_url} alt={category.name} />
                        <p>{category.name}</p>
                        <button onClick={() => handleSelectCategory(category.id)}>Select</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategorySelect;