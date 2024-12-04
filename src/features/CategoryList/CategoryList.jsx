// src/features/CategoryList/CategoryList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.scss';

function CategoryList({ onSelectCategory }) {
    const [categoryList, setCategoryList] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryList = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://143.198.193.9:8989/category?page=1&page_size=100', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategoryList(data);
            } catch (error) {
                console.error('There was an error fetching the category list!', error);
            }
        };

        fetchCategoryList();
    }, [navigate]);

    return (
        <div className="list-category-container">
            <h2>CATEGORIES</h2>
            <div className="category-list">
                {categoryList.map(category => (
                    <div key={category.id}
                         className={`category-item ${categoryId === category.id ? 'selected' : ''}`}
                         onClick={() => {
                             setCategoryId(category.id);
                             onSelectCategory(category.id);
                         }}>
                        <img src={category.icon_catalog_image_url} alt={category.name}/>
                        <span>{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;