import React, { useState} from "react";
import ATMNavBar from "../components/ATMDashboardNavBar";
import './ATMDashboard.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ATMDashboard = () => {
    const [amount, setAmount] = useState('')
    const balance = sessionStorage.getItem("accountBalance")

    const bankID = sessionStorage.getItem("bankID")

    const handleWithdrawl = (e) => {
        e.preventDefault();
        const amountNum = parseFloat(amount);
        // Simple validation for withdrawal
        if (amountNum <= 0 || isNaN(amountNum)) {
            alert("Please enter a valid amount.");
        } else if (amountNum > balance) {
            alert("Insufficient funds.");
        } else {
            const newBalance = (balance - amountNum)
            
            axios.put('http://localhost:4000/UpdateAccountBalance', {
                bankID: bankID, newBalance: newBalance
            })
            .then(response =>{
                console.log('Response recieved:', response.data)
                if(response.data.success){
                    alert('Balance Updated')
                }
            })
            .catch(error => {
                console.error('Error occurred:', error);
                if (error.response && error.response.status === 401) {
                  alert("Invalid credentials");
                } else {
                  alert("Error validating credentials");
                }
              })
            axios.post('http://localhost:4000/add-transaction',{
                transactionID: '',
                bankID: bankID,
                accountBalance: newBalance,
                transaction: -(Number(amount)),
                connectedAccount: 'N/A',
                date: new Date().toLocaleDateString(),
                type: 'Withdrawal'
            })
            .then(response => {
                if(response.data.success){
                    console.log('Response recieved:', response.data);
                    sessionStorage.setItem("accountBalance", newBalance);
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error occurred:', error);
                if (error.response && error.response.status === 401) {
                  alert("Invalid input values");
                } else {
                  alert("Error validating input values");
                }
            })

             
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
            <p>Available Balance: ${Number(balance).toFixed(2)}</p>
            <form onSubmit={handleWithdrawl}>
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
