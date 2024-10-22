import React, { useState } from "react";
import ATMNavBar from "../components/ATMDashboardNavBar";
import './ATMDashboard.css';

const ATMDashboard = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState(5000); // Default balance

    const handleWithdraw = (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);

        // Simple validation for withdrawal
        if (amountNum <= 0 || isNaN(amountNum)) {
            setMessage("Please enter a valid amount.");
        } else if (amountNum > balance) {
            setMessage("Insufficient funds.");
        } else {
            setBalance(balance - amountNum); // Update balance
            setMessage(`You have withdrawn $${amountNum}. Your new balance is $${(balance - amountNum).toFixed(2)}.`);
            setAmount(''); // Clear input field
        }
    };

    const handleKeyPress = (num) => {
        setAmount(prev => prev + num); // Concatenate number to amount
    };

    const handleBackspace = () => {
        setAmount(amount.slice(0, -1)); // Remove the last digit
    };

    return (
        <div className="withdrawal-wrapper">
            <ATMNavBar />
            <h2>ATM Withdrawal</h2>
            <p>Available Balance: ${balance.toFixed(2)}</p>
            <form onSubmit={handleWithdraw}>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Enter amount to withdraw"
                        value={amount}
                        readOnly /* Make the input read-only so users can only input via keypad */
                    />
                </div>
                <button type="submit">Withdraw</button>
            </form>
            {message && <p>{message}</p>}

            {/* Keypad */}
            <div className="keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button key={num} onClick={() => handleKeyPress(num)}>
                        {num}
                    </button>
                ))}
                <button className="backspace" onClick={handleBackspace}>⌫</button>
                <button onClick={() => handleKeyPress(0)}>0</button>
            </div>
        </div>
    );
};

export default ATMDashboard;
