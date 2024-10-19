import React, { useState,} from "react";
import WindowWrapper from "../components/WindowWrapper";
import './TransactionPage.css';

const TransactionPage = () => {
    // Sample data
    const [transactions] = useState([
        { dateTime: '2024-10-01 01:30', type: 'Deposit', amount: '+$200', balanceAfter: '$4000.00' },
        { dateTime: '2024-10-05 14:03', type: 'Withdrawal', amount: '-$50', balanceAfter: '$3800.00' },
        { dateTime: '2024-10-10 07:00', type: 'Deposit', amount: '+$100', balanceAfter: '$3900.00' },
        { dateTime: '2024-10-12 16:45', type: 'Transfer', amount: '-$150', balanceAfter: '$3750.00' },
    ]);
;
    return (
        <WindowWrapper showSideNav={true}>
            <div className="transaction-container">
                <h1>Transaction History (wip)</h1>
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
                                <td colSpan="3" style={{ textAlign: 'center' }}>No transactions available</td>
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