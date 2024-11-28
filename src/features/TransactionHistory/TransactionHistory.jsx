// src/features/TransactionHistory/TransactionHistory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionHistory.scss";
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import { MyDatePicker } from "../../components/DayPicker/DayPicker";
import { FaPlus } from "react-icons/fa";

function TransactionHistory() {
    const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [typeFilter, setTypeFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [categoryNames, setCategoryNames] = useState({});
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);
    const navigate = useNavigate();

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
                    <div className="date-picker-container">
                        <div className="date-picker-plus-container">
                            <MyDatePicker onDateRangeChange={setDateRange}/>
                        </div>
                    </div>
                    <div className="filters">
                        <button onClick={() => setTypeFilter(typeFilter === 'income' ? '' : 'income')}>Income</button>
                        <button onClick={() => setTypeFilter(typeFilter === 'expense' ? '' : 'expense')}>Expense</button>
                        <button onClick={() => setShowCategoryFilter(!showCategoryFilter)}>Category</button>
                        {showCategoryFilter && (
                            <input
                                type="text"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                placeholder="Category ID"
                            />
                        )}
                    </div>
                    <div className="transaction-history">
                        <h2>Transaction History</h2>
                        <ul>
                            {transactions.map(transaction => (
                                <li key={transaction.id}>
                                    <p>{transaction.created_at}</p>
                                    <p>{categoryNames[transaction.category_id]}</p>
                                    <p>{transaction.amount}</p>
                                    <p>{transaction.type}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination">
                            <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
                            <span>Page {page}</span>
                            <button onClick={() => setPage(page + 1)}>Next</button>
                        </div>
                    </div>
                    <button onClick={handlePlusClick} className="plus-button">
                        <FaPlus/>
                    </button>
                </div>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default TransactionHistory;