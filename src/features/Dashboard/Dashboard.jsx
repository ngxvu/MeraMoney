// src/features/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import { MyDatePicker } from "../../components/DayPicker/DayPicker";
import { FaPlus } from "react-icons/fa";

function Dashboard() {
    const [netBalance, setNetBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
    const navigate = useNavigate();

    useEffect(() => {
        if (dateRange.from && dateRange.to) {
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
                    setNetBalance(data.balance);
                } catch (error) {
                    console.error('Error fetching net balance:', error);
                }
            };

            const fetchTotalIncome = async () => {
                const start = dateRange.from;
                const end = dateRange.to;
                const accessToken = localStorage.getItem('accessToken');

                try {
                    const response = await fetch(`http://143.198.193.9:8989/total-income?start=${start}&end=${end}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setTotalIncome(data.total_income);
                } catch (error) {
                    console.error('Error fetching total income:', error);
                }
            };

            const fetchTotalExpense = async () => {
                const start = dateRange.from;
                const end = dateRange.to;
                const accessToken = localStorage.getItem('accessToken');

                try {
                    const response = await fetch(`http://143.198.193.9:8989/total-expense?start=${start}&end=${end}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setTotalExpense(data.total_expense);
                } catch (error) {
                    console.error('Error fetching total expense:', error);
                }
            };

            fetchNetBalance();
            fetchTotalIncome();
            fetchTotalExpense();
        }
    }, [dateRange]);

    const handlePlusClick = () => {
        navigate('/add-transactions');
    };

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
                        <div className="date-picker-container">
                            <div className="date-picker-plus-container">
                                <MyDatePicker onDateRangeChange={setDateRange}/>
                            
                            </div>
                        </div>
                        <div className="summary">
                            <h3>Summary</h3>
                            <p>Total Income: ${totalIncome !== undefined ? totalIncome.toFixed(2) : "0.00"}</p>
                            <p>Total Expense: ${totalExpense !== undefined ? totalExpense.toFixed(2) : "0.00"}</p>
                            <p>Net Balance: ${netBalance !== undefined ? netBalance.toFixed(2) : "0.00"}</p>
                        </div>
                        
                        <button onClick={handlePlusClick} className="plus-button">
                            <FaPlus/>
                        </button>
                    </div>
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default Dashboard;