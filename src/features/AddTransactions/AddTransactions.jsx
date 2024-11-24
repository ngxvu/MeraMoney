// src/features/AddTransactions/AddTransactions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransactions.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";

function AddTransactions() {
    const navigate = useNavigate();

    const handleButtonClick = (type) => {
        if (type === 'Income') {
            navigate('/add-transaction-income');
        } else {
            console.log(`Button clicked: ${type}`);
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
            <div className="add-transactions-container">
                <h2>Add Transactions</h2>
                <div className="button-container">
                    <button onClick={() => handleButtonClick('Income')} className="transaction-button">Income</button>
                    <button onClick={() => handleButtonClick('Expenses')} className="transaction-button">Expenses
                    </button>
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default AddTransactions;