import React, { useState, useLocation } from "react";
import ATMNavBar from "../components/ATMDashboardNavBar";
import './ATMDashboard.css';
const axios = require('axios')

/* 
***Backend Notes***
    ATMDashboard.js uses two functions from app.js
    - Request of Account Balance Value, ~ Line 35, Used 1 time
        
        Description: 
        When the 'ATMDashboard.js' page is loaded, a request will then be sent to the AWS Database for the
        Account Balance Value using the users Account Id. A response is then sent
        back to "ATMDashboard.js" that contains the Account Balance Value. This
        value will then be stored in the variable 'balance' using the 'setBalance'
        function expression. 
    
    - Request to Modify Account Balance Value, ~ Line 48, Used 1 time
        
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
    const [balance, setBalance] = useState(0)

    const {accountId} = location.state
    setBalance(axios.get('http://localhost:4000/account-balance', {
        params: {accountId: accountId}
    }))

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('http://localhost:4000/account-balance', {
                    params: { accountId: accountId },
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching account balance:", error);
                setMessage("Error fetching account balance.");
            }
        };
        fetchBalance();
    }, [accountId]);

    const handleWithdraw = async (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);
        // Simple validation for withdrawal
        if (amountNum <= 0 || isNaN(amountNum)) {
            setMessage("Please enter a valid amount.");
        } else if (amountNum > balance) {
            setMessage("Insufficient funds.");
        } else {
            const newBalance = (balance - amountNum)
            try {
                // Update balance on the server
                await axios.put('http://localhost:4000/account-balance', {
                    accountId: accountId,
                    balance: newBalance,
                    reqType: "customer",
                });
                
                setBalance(newBalance);
                setMessage(`You have withdrawn $${amountNum}. Your new balance is $${newBalance.toFixed(2)}.`);
                setAmount(""); // Clear the input
            } catch (error) {
                console.error("Error updating account balance:", error);
                setMessage("Error updating account balance.");
            }

             
        }
    };

    const handleKeyPress = (num) => {
        setAmount(prev => prev + num); 
    };

    const handleBackspace = () => {
        setAmount(amount.slice(0, -1)); 
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
