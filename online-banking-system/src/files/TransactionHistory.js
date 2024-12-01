import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { TableCell, TableHead, TableRow, TableBody, Text, Table } from "@aws-amplify/ui-react";
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
                <table
                highlightOnHover={true} 
                style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px #AAAAAA' }}>
                    <TableHead>
                                <TableRow>
                                    <TableCell as="th">Transaction ID</TableCell> 
                                    <TableCell as="th">Date</TableCell>
                                    <TableCell as="th">Transaction Type</TableCell>
                                    <TableCell as="th">Transaction Amount</TableCell>
                                    <TableCell as="th">Account Balance</TableCell>
                                    <TableCell as="th">Bank ID</TableCell>
                                    <TableCell as="th">Connected Account</TableCell>
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
                                        <TableCell>{transaction.connectedAccount}</TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>  
                </table>
            </div>
        </WindowWrapper>
    );
};

export default TransactionHistory;
