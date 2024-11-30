import React, {useState} from 'react';
import axios from 'axios';
import WindowWrapper from '../components/WindowWrapper';

const TransactionHistory = () => {
    // State to hold transactions
    const [transactions, setTransactions] = useState([]);
    const bankID = sessionStorage.getItem("bankID") || {}
    // Fetch transactions from the API
    axios.get('http://localhost:4000/transaction-history',{
            params: {bankID: bankID }
        })
        .then(response =>{
            if(response.data.success){
                setTransactions(response.data)
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
                                    <td>{transaction.dateTime}</td>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.balanceAfter}</td>
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
