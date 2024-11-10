import React, { useState } from "react";
import ATMNavBar from "../components/ATMDashboardNavBar";
import './ATMDashboard.css';

const ATMDashboard = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState(5000);

    // Handle withdrawal form submission
    const handleWithdraw = (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);

        // Validation for empty input or invalid number
        if (amount === '' || isNaN(amountNum)) {
            setMessage("Please enter a valid amount.");
            return;
        }

        // Check for input ending with '.' or only one decimal place (like 12. or 0. or 12.1)
        if (amount.endsWith('.') || (amount.includes('.') && amount.split('.')[1].length < 2)) {
            setMessage("Invalid input. Please enter an amount with two decimal places (e.g., 12.00).");
            return;
        }

        // Restrict to two decimal places
        if (amount.includes('.') && amount.split('.')[1].length > 2) {
            setMessage("Please enter an amount with up to two decimal places.");
            return;
        }

        // Check for zero or negative amounts
        if (amountNum <= 0) {
            setMessage("Amount must be greater than zero.");
        } else if (amountNum > balance) {
            setMessage("Insufficient funds.");
        } else {
            // Update balance and show success message
            setBalance(balance - amountNum);
            setMessage(`You have withdrawn $${amountNum.toFixed(2)}. Your new balance is $${(balance - amountNum).toFixed(2)}.`);
            setAmount('');
        }
    };

    // Handle numeric input from the keypad
    const handleKeyPress = (num) => {
        // Prevent multiple decimals
        if (num === '.' && amount.includes('.')) return;

        // Prevent entering incomplete decimals (like '12.' or '0.')
        if (num === '.' && (amount === '' || amount.endsWith('.'))) return;

        // Enforce two decimal places restriction
        const parts = amount.split('.');
        if (parts.length === 2 && parts[1].length >= 2) return;

        // Append the new character
        setAmount(prev => prev + num);
    };

    // Handle backspace input
    const handleBackspace = () => {
        setAmount(amount.slice(0, -1));
    };

    return (
        <div className="withdrawal-wrapper">
            <ATMNavBar />
            <h2>ATM Withdrawal</h2>

            {/* Account Balance Display */}
            <div className="balance-box">
                <h3>Account Balance</h3>
                <div className="balance-container">
                    <span className="currency-icon">💰</span>
                    <span className="balance">${balance.toFixed(2)}</span>
                </div>
                <div className="balance-progress">
                    <div className="progress-bar" style={{ width: `${(balance / 10000) * 100}%` }}></div>
                </div>
            </div>

            {/* Withdrawal Form */}
            <form onSubmit={handleWithdraw}>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Enter amount to withdraw"
                        value={amount}
                        readOnly
                    />
                </div>
                <button type="submit">Withdraw</button>
            </form>
            {message && <p>{message}</p>}

            {/* Keypad for input */}
            <div className="keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button key={num} onClick={() => handleKeyPress(num.toString())}>
                        {num}
                    </button>
                ))}
                <button className="backspace" onClick={handleBackspace}>⌫</button>
                <button onClick={() => handleKeyPress('0')}>0</button>
                <button className="decimal" onClick={() => handleKeyPress('.')}>.</button>
            </div>
        </div>
    );
};

export default ATMDashboard;

