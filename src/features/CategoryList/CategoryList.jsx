import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryList.scss';
import config from "../../config";

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
            
            let allCategories = [];
            let currentPage = 1;
            const pageSize = 10;
            let hasMoreData = true;
            
            try {
                while (hasMoreData) {
                    const response = await fetch(
                        `${config.apiBaseUrl}:${config.apiPort}${config.endpoints.category}?page=${currentPage}&page_size=${pageSize}`, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    
                    const data = await response.json();
                    allCategories = [...allCategories, ...data];
                    hasMoreData = data.length === pageSize;
                    currentPage++;
                }
                
                setCategoryList(allCategories);
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