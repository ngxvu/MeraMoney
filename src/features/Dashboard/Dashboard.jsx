// src/features/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import { MyDatePicker } from "../../components/DayPicker/DayPicker";

function Dashboard() {
    const [netBalance, setNetBalance] = useState(0);
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });

    useEffect(() => {
        if (dateRange.from && dateRange.to) {
            console.log("Date Range in Dashboard:", dateRange); // Debug log
            const fetchNetBalance = async () => {
                const start = dateRange.from;
                const end = dateRange.to;
                const accessToken = localStorage.getItem('accessToken');

                try {
                    const response = await fetch(`http://143.198.193.9:8989/balance?start=${start}&end=${end}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log("API Response Data:", data); // Debug log
                    setNetBalance(data.balance); // Update to use data.balance
                } catch (error) {
                    console.error('Error fetching net balance:', error);
                }
            };

            fetchNetBalance();
        }
    }, [dateRange]);

    return (
        <>
            <div className="dashboard-banner-container">
                <header className="dashboard-banner">
                    <div className="dashboard-logo-container">
                        <img src={logo} alt="Logo"/>
                        <span className="logo-text">Meramoney</span>
                    </div>
                    <Navbar />
                </header>
            </div>
            <div className="dashboard">
                <div className="dashboard-content">
                    <div className="main-content">
                        <h2>Welcome to the Dashboard</h2>
                        <p>This is your main content area.</p>
                        <MyDatePicker onDateRangeChange={setDateRange} />
                        <div className="summary">
                            <h3>Summary</h3>
                            <p>Total Income: $0.00</p>
                            <p>Total Expense: $0.00</p>
                            <p>Net Balance: ${netBalance.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default Dashboard;