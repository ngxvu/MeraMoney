import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import SingleDayPicker from '../../components/SingleDayPicker/SingleDayPicker';
import { FaCalendarAlt } from 'react-icons/fa';
import logo from "../../assets/images/finalcs50-meramoney.png";
import './AddTransactionExpense.scss';

const AddTransactionExpense = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [createAt, setCreateAt] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryList = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://143.198.193.9:8989/category?page=1&page_size=100', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategoryList(data);
            } catch (error) {
                console.error('There was an error fetching the category list!', error);
            }
        };

        fetchCategoryList();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigate('/login');
            return;
        }

        const transactionData = {
            create_at: createAt,
            category_id: parseInt(categoryId, 10),
            amount: parseFloat(amount),
            description,
            type: 'expense'
        };

        try {
            const response = await fetch('http://143.198.193.9:8989/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(transactionData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('There was an error creating the transaction!', error);
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
            <div className="add-transaction-expense">
                <form onSubmit={handleSubmit} className="form-container">
                    <div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Amount"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                    </div>
                    <div>
                        <h2>CATEGORIES</h2>
                        <div className="category-list">
                            {categoryList.map(category => (
                                <div key={category.id} className={`category-item ${categoryId === category.id ? 'selected' : ''}`}
                                     onClick={() => setCategoryId(category.id)}>
                                    <img src={category.icon_catalog_image_url} alt={category.name}/>
                                    <span>{category.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button type="button" onClick={() => setShowDatePicker(!showDatePicker)} className="date-picker-toggle-button">
                            <FaCalendarAlt/>
                        </button>
                        {showDatePicker && (
                            <SingleDayPicker onDateChange={setCreateAt}/>
                        )}
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
            <footer>Cs50FinalMeramoney - by Nguyen Xuan Vu</footer>
        </>
    );
}

export default AddTransactionExpense;