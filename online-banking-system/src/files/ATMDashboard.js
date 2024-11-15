import React, { useState, useLocation } from "react";
import ATMNavBar from "../components/ATMDashboardNavBar";
import './ATMDashboard.css';
const axios = require('axios')

/* 
***Backend Notes***
    ATMDashboard.js uses two functions from app.js
    - Request of Account Balance Value, ~ Line 35
        
        Description: 
        When the 'ATMDashboard.js' page is loaded, the node.js function will
        be activated. A request will then be sent to the AWS Database for the
        Account Balance Value using the users Account Id. A response is then sent
        back to "ATMDashboard.js" that contains the Account Balance Value. This
        value will then be stored in the variable 'balance' using the 'setBalance'
        function expression. 
    
    - Request to Modify Account Balance Value, ~ Line 48
        
        Description:
        When the user authorizes a "Withdrawl", the value of the Account Balance
        will be subtracted from the "Withdrawl" value. This new value will represent
        the users New Balance. This New Balance will then be sent to the AWS Database
        through a node.js request and will send a response back to 'ATMDashboard.js'
        if the Account Balance was updated successfully.
*/
const ATMDashboard = () => {
    const location = useLocation()
    const [amount, setAmount] = useState('')
    const [message, setMessage] = useState('')
    const [balance, setBalance] = useState('')

    const {accountId} = location.state
    setBalance(axios.get('http://localhost:3000/account-balance', {
        params: {accountId: accountId}
    }))

    const handleWithdraw = (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);
        // Simple validation for withdrawal
        if (amountNum <= 0 || isNaN(amountNum)) {
            setMessage("Please enter a valid amount.");
        } else if (amountNum > balance) {
            setMessage("Insufficient funds.");
        } else {
            setBalance(balance - amountNum)
            axios.put('http://localhost:3000/account-balance', {
                params: {accountId: accountId, newBalance: balance, reqType: 'customer'}
            })
            setMessage(`You have withdrawn $${amountNum}. Your new balance is $${(balance).toFixed(2)}.`);
            setAmount('');

            ; 
             
        }
    };

    const handleKeyPress = (num) => {
        setAmount(prev => prev + num); 
    };

    const handleBackspace = () => {
        setAmount(amount.slice(0, -1)); 
        handleWithdraw()
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
                        readOnly 
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
