import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './CategoryView.scss';
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";
import Footer from "../Footer/Footer";

function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
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
                        `${config.apiBaseUrl}${config.endpoints.category}?page=${currentPage}&page_size=${pageSize}`, {
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
            < Footer />
        </>
    );
}

export default CategoryList;