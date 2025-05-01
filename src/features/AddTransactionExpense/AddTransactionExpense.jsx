import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import SingleDayPicker from '../../components/SingleDayPicker/SingleDayPicker';
import logo from "../../assets/images/finalcs50-meramoney.png";
import './AddTransactionExpense.scss';
import config from "../../config";
import Footer from "../Footer/Footer";

const AddTransactionExpense = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [createAt, setCreateAt] = useState(new Date());
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCategoryList = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/login');
                return;
            }
            
            let allCategories = [];
            let currentPage = 1;
            const pageSize = 10;
            let hasMoreData = true;
            
            try {
                while (hasMoreData) {
                    const response = await fetch(
                        `${config.apiBaseUrl}:${config.apiPort}${config.endpoints.category}?page=${currentPage}&page_size=${pageSize}`, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    
                    const data = await response.json();
                    allCategories = [...allCategories, ...data];
                    hasMoreData = data.length === pageSize;
                    currentPage++;
                }
                
                setCategoryList(allCategories);
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
            const response = await fetch(`${config.apiBaseUrl}:${config.apiPort}${config.endpoints.transaction}`, {
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
                <div className="left-section">
                    <div className="date-picker-container">
                        <SingleDayPicker onDateChange={setCreateAt}/>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount"
                                required
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                            <button type="submit">Create</button>
                        </form>
                    </div>
                </div>
                <div className="right-section">
                    <div className="list-category-container">
                        <h2>CATEGORIES</h2>
                        <div className="category-list">
                            {categoryList.map(category => (
                                <div key={category.id}
                                     className={`category-item ${categoryId === category.id ? 'selected' : ''}`}
                                     onClick={() => setCategoryId(category.id)}>
                                    <img src={category.icon_catalog_image_url} alt={category.name}/>
                                    <span>{category.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            < Footer />
        </>
    );
}

export default AddTransactionExpense;