import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Dashboard.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import {MyDatePicker} from "../../components/DayPicker/DayPicker";
import {FaPlus} from "react-icons/fa";
import Footer from "../Footer/Footer";
import config from "../../config";

function Dashboard() {
    const [netBalance, setNetBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [dateRange, setDateRange] = useState({from: undefined, to: undefined});
    const navigate = useNavigate();
    
    useEffect(() => {
        if (dateRange.from && dateRange.to) {
            const fetchNetBalance = async () => {
                const start = dateRange.from;
                const end = dateRange.to;
                const accessToken = localStorage.getItem('accessToken');
                
                try {
                    const response = await fetch(`${config.apiBaseUrl}${config.endpoints.balance}?start=${start}&end=${end}`, {
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
                    const response = await fetch(`${config.apiBaseUrl}${config.endpoints.totalIncome}?start=${start}&end=${end}`, {
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
                    const response = await fetch(`${config.apiBaseUrl}${config.endpoints.totalExpense}?start=${start}&end=${end}`, {
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
            <div className="navbar-banner-container">
                <header className="navbar-banner">
                    <div className="navbar-logo-container">
                        <img src={logo} alt="Logo"/>
                        <span className="navbar-logo-text">Meramoney</span>
                    </div>
                    <Navbar/>
                </header>
            </div>
            <div className="dashboard">
                <div className="left-section">
                    <div className="date-range-picker-container">
                        <MyDatePicker onDateRangeChange={setDateRange}/>
                    </div>
                    <div className="right-section">
                        <div className="summary">
                            <h2>SUMMARY</h2>
                            <p>Total Income: đ{totalIncome !== undefined ? totalIncome.toFixed(0) : "0"}</p>
                            <p>Total Expense: đ{totalExpense !== undefined ? totalExpense.toFixed(0) : "0"}</p>
                            <p>Net Balance: đ{netBalance !== undefined ? netBalance.toFixed(0) : "0"}</p>
                        </div>
                        <button onClick={handlePlusClick} className="add-transaction-button">
                            <FaPlus/>
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Dashboard;