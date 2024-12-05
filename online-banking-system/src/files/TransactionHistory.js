import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableCell, TableHead, TableRow, TableBody, Table, Button } from "@aws-amplify/ui-react";
import WindowWrapper from '../components/WindowWrapper';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const bankID = sessionStorage.getItem("bankID") || "";

    useEffect(() => {
        axios.get('http://localhost:4000/transaction-history', {
            params: { bankID: bankID }
        })
        .then(response => {
            if (response.data.success) {
                setTransactions(response.data.history);
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            } else {
                alert("Error validating credentials");
            }
        });
    }, [bankID]);

    return (
        <WindowWrapper showSideNav={true}>
            <div style={{ padding: "20px", backgroundColor: 'transparent' }}>
                <h2>Transaction History</h2>
                <Table 
                    highlightOnHover={true}
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 10px #AAAAAA',
                        marginBottom: '20px'
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell as="th">Transaction ID</TableCell>
                            <TableCell as="th">Date</TableCell>
                            <TableCell as="th">Transaction Type</TableCell>
                            <TableCell as="th">Transaction Amount</TableCell>
                            <TableCell as="th">Account Balance</TableCell>
                            <TableCell as="th">Bank ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.slice().reverse().map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.transactionID}</TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>${transaction.transaction}</TableCell>
                                <TableCell>${transaction.accountBalance}</TableCell>
                                <TableCell>{transaction.bankID}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </WindowWrapper>
    );
};

export default TransactionHistory;
