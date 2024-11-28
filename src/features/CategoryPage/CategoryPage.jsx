// src/features/CategoryPage/CategoryPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.scss';
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";

function CategoryPage() {
    const navigate = useNavigate();

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
    <div className="category-page">
        <button onClick={() => navigate('/list-categories')}>List Categories</button>
        <button onClick={() => navigate('/create-category')}>Create Category</button>
    </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
);
}

export default CategoryPage;