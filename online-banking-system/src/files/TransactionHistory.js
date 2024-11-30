import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WindowWrapper from '../components/WindowWrapper';

const TransactionHistory = () => {
    // State to hold transactions
    const [transactions, setTransactions] = useState([]);
    const bankID = sessionStorage.getItem("bankID") || {}
    // Fetch transactions from the API
    useEffect(() => {
        axios.get('http://localhost:4000/transaction-history',{
            params: {bankID: bankID }
        })
        .then(response =>{
            if(response.data.success){
                setTransactions(response.data.history)
            }
        })
        .catch(error =>{
            if(error.response && error.response.status === 401){
                alert("Invalid credentials")
            } 
            else{
                alert("Error validating credentials")
            }
        })
    }, [])
   

    return (
        <WindowWrapper showSideNav={true}>
            <div className="transaction-container">
                <h1>Transaction History</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>Balance After Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No transactions available</td>
                            </tr>
                        ) : (
                            transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.date}</td>
                                    <td>{}</td>
                                    <td>{transaction.transaction}</td>
                                    <td>{transaction.accountBalance}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </WindowWrapper>
    );
};

export default TransactionHistory;
