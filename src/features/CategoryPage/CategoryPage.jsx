import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.scss';
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../Footer/Footer";

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
            <div className="category-page-container">
                <div className="category-page-button">
                <button onClick={() => navigate('/view-categories')} className="list-category-button">View Categories</button>
                <button onClick={() => navigate('/create-category')} className="list-create-button">Create Category</button>
            </div>
            </div>
            < Footer />
        </>
    );
}

export default CategoryPage;