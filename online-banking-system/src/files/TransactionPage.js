import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WindowWrapper from '../components/WindowWrapper';

const TransactionPage = () => {
    // State to hold transactions
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from the API
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/transactionhistory');
                const transactionData = response.data.transactions;

                // Format the transactions to match the desired structure
                const formattedTransactions = transactionData.map(transaction => ({
                    dateTime: new Date(transaction.date).toLocaleString(), // Format date as 'YYYY-MM-DD HH:mm'
                    type: transaction.type,
                    amount: transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`,
                    balanceAfter: `$${transaction.balanceAfter.toFixed(2)}`, // Format balance to two decimal places
                }));

                setTransactions(formattedTransactions);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
            }
        };

        fetchTransactions();
    }, []); // Run only once when the component mounts

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

export default TransactionPage;
