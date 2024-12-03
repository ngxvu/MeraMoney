// src/features/TransactionHistory/TransactionHistory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TransactionHistory.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import { MyDatePicker } from "../../components/DayPicker/DayPicker";
import { FaPlus } from "react-icons/fa";

function TransactionHistory() {
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [typeFilter, setTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [categoryNames, setCategoryNames] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.selectedCategoryId !== undefined) {
            setCategoryFilter(location.state.selectedCategoryId);
        }
    }, [location.state]);

    useEffect(() => {
        if (dateRange.from && dateRange.to) {
            fetchTransactions();
        }
    }, [dateRange, page, typeFilter, categoryFilter]);

    const fetchTransactions = async () => {
        const start = dateRange.from;
        const end = dateRange.to;
        const accessToken = localStorage.getItem('accessToken');
        const type = typeFilter ? `&type=${typeFilter}` : '';
        const category = categoryFilter ? `&search=${categoryFilter}` : '';

        try {
            const response = await fetch(`http://143.198.193.9:8989/transaction?page=${page}&pageSize=${pageSize}&start=${start}&end=${end}${type}${category}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTransactions(data);
            fetchCategoryNames(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchCategoryNames = async (transactions) => {
        const accessToken = localStorage.getItem('accessToken');
        const categoryIds = [...new Set(transactions.map(t => t.category_id))];
        const categoryNames = {};

        for (const id of categoryIds) {
            try {
                const response = await fetch(`http://143.198.193.9:8989/category/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                categoryNames[id] = data.name;
            } catch (error) {
                console.error(`Error fetching category name for id ${id}:`, error);
            }
        }

        setCategoryNames(categoryNames);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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
                    <Navbar />
                </header>
            </div>
            <div className="transaction-history-page">
                <div className="main-content">
                    <div className="left-panel">
                        <div className="date-range-picker-container">
                            <MyDatePicker onDateRangeChange={setDateRange}/>
                        </div>
                        <div className="filters">
                            <h2>Filters</h2>
                            <button
                                className={typeFilter === 'income' ? 'active' : ''}
                                onClick={() => setTypeFilter(typeFilter === 'income' ? '' : 'income')}
                            >
                                Income
                            </button>
                            <button
                                className={typeFilter === 'expense' ? 'active' : ''}
                                onClick={() => setTypeFilter(typeFilter === 'expense' ? '' : 'expense')}
                            >
                                Expense
                            </button>
                            <button onClick={() => navigate('/category-select')}>Category</button>
                        </div>
                    </div>
                    <div className="right-panel">
                        <div className="transaction-history">
                            <h2>Transaction History</h2>
                            <ul className="transaction-history-header">
                                <li>
                                    <div><strong>Type</strong></div>
                                    <div><strong>Amount</strong></div>
                                    <div><strong>Category</strong></div>
                                    <div><strong>Date</strong></div>
                                </li>
                            </ul>
                            <ul>
                                {transactions.map(transaction => (
                                    <li key={transaction.id}>
                                        <div>
                                            <strong>{transaction.type === 'income' ? 'Income' : 'Expense'}</strong>
                                        </div>
                                        <div>
                                            <span>{transaction.amount}</span>
                                        </div>
                                        <div>
                                            <span>{categoryNames[transaction.category_id]}</span>
                                        </div>
                                        <div>
                                            <span>{formatDate(transaction.updated_at)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {transactions.length > 0 && (
                                <div className="pagination">
                                    <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Prev</button>
                                    <span>Page {page}</span>
                                    <button onClick={() => setPage(page + 1)}>Next</button>
                                </div>
                            )}
                        </div>
                            <button onClick={handlePlusClick} className="add-transaction-button">
                                <FaPlus/>
                            </button>
                    </div>
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default TransactionHistory;