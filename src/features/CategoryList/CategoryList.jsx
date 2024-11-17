// src/features/CategoryList/CategoryList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.scss';

function CategoryList() {
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

    return (
        <div className="category-list">
            {categories.map(category => (
                <div key={category.id} className="category-item">
                    <img src={category.icon_catalog_image_url} alt={category.name} />
                    <p>{category.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CategoryList;