import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './features/Login/Login';
import SignUp from './features/SignUp/SignUp';
import Dashboard from './features/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './features/Profile/Profile';
import Settings from './features/Settings/Settings';
import AddTransactions from './features/AddTransactions/AddTransactions';

function App() {
    const handleLogin = () => {
    };
    
    const handleSignUp = () => {
    };
    
    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<SignUp onSignUp={handleSignUp}/>}/>
                <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                }/>
                <Route path={"/settings"} element={
                    <ProtectedRoute>
                        <Settings/>
                    </ProtectedRoute>
                }/>
                <Route path={"/add-transactions"} element={
                    <ProtectedRoute>
                        <AddTransactions/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App/>
        </Router>
    );
}