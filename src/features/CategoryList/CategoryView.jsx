import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryView.scss';
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";

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
            <div className="view-category-container">
                <div className="view-category-list">
                    {categoryList.map(category => (
                        <div className="category-item">
                            <img src={category.icon_catalog_image_url} alt={category.name}/>
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="view-category-page-button">
                <button onClick={() => navigate('/category')} className="category-page-button">Back</button>
            </div>
                <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
            </>
            );
            }
            
            export default CategoryList;