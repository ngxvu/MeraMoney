// Update the Dashboard component
import React from "react";
import "./Dashboard.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import { MyDatePicker } from "../../components/DayPicker/DayPicker";

function Dashboard() {
    return (
        <>
            <div className="dashboard-banner-container">
                <header className="dashboard-banner">
                    <div className="dashboard-logo-container">
                        <img src={logo} alt="Logo"/>
                        <span className="logo-text">Meramoney</span>
                    </div>
                    <Navbar /> {/* Move Navbar here */}
                </header>
            </div>
            <div className="dashboard">
                <div className="dashboard-content">
                    <div className="main-content">
                        <h2>Welcome to the Dashboard</h2>
                        <p>This is your main content area.</p>
                        <MyDatePicker />
                        <div className="summary">
                            <h3>Summary</h3>
                            <p>Total Income: $0.00</p>
                            <p>Total Expense: $0.00</p>
                            <p>Net Balance: $0.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default Dashboard;