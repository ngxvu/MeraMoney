// Update the JSX in `src/features/AddTransactions/AddTransactions.jsx`
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AddTransactions.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";
import Footer from "../Footer/Footer";

function AddTransactions() {
    const navigate = useNavigate();

    const handleButtonClick = (type) => {
        if (type === 'Income') {
            navigate('/add-transaction-income');
        } if (type === 'Expenses') {
            navigate('/add-transaction-expense');
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
            <h2>ADD TRANSACTIONS</h2>
            <div className="add-transactions-container">
                <div className="button-container">
                    <button onClick={() => handleButtonClick('Income')} className="transaction-button">Income</button>
                    <button onClick={() => handleButtonClick('Expenses')} className="transaction-button">Expenses</button>
                </div>
            </div>
            < Footer />
        </>
    );
}

export default AddTransactions;