import { Button, Divider, Table, TableCell, TableHead, TableRow, TableBody, Text } from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUpload, faMoneyBillTransfer} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation} from "react-router-dom";
import {faBuildingColumns} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

/*
***Backend Notes***
    'CustomerDashBoard.js' uses two functions from app.js
    - Request Account Balance, ~ Line 21, Used 1 time
        When the 'CustomerDashboard.js' page is loaded, a request will then be sent to the AWS Database for the
        Account Balance Value using the users Account Id. A response is then sent
        back to "ATMDashboard.js" that contains the Account Balance Value. This
        value will then be stored in the variable 'balance' using the 'setBalance'
        function expression.

    - Request Account Settings, ~ Lines 30 & 35, Used 3 times
        The account settings that are requested for the Customer Dashboard are
        the First Name, Last Name, and Username. Each piece of information will
        have it's own request thats sent to the database and its own reponse sent
        from the database containing that variables data. Although each piece of
        information is using its own 'axios' request, all are being sent through the 
        same node.js function 'account-settings'.
*/

const CustomerDashboard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {accountId} = location.state
    const [balance, setBalance] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [transactionHistory, setTransactions] = useState('')

    
    useEffect(() => {
        const fetchAccountDetails = async () => {
            try{
                const balanceResponse = await axios.get('http://localhost:4000/account-balance', {
                    params : {accountId: accountId}
                })
                setBalance(balanceResponse.data.accountBalance)

                const accountSettings = await axios.get('http://localhost:4000/account-settings', {
                    params: {accountId: accountId, accType: 'cust', reqType: 'first_name'}
                })
                setFirstName(accountSettings.data.firstName)
                setLastName(accountSettings.data.lastName)
                setUsername(accountSettings.data.username)
            }catch(error) {
                console.error("Error fetching account details", error)
            }
        }
        const fetchTransactions = async () => {
            try {
                const transactions = await axios.get('http://localhost:4000/transaction-history', {
                    params: {accountId} })
                // more research needs to be done for this functionality
                setTransactions(transactions.data.transactionHistory);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setMessage("Error fetching transactions")
            }
        }
        fetchAccountDetails()
        fetchTransactions()
        
    }, [accountId])
    
    
    
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev)
    }

    const closeDropdown = () => {
        setDropdownOpen(false)
    }

    const clickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const profilePic = document.getElementById('profile-pic');
        if (dropdown && !dropdown.contains(event.target) && !profilePic.contains(event.target)) {
            closeDropdown()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickOutside);
        return () => {
            window.removeEventListener('click', clickOutside);
        };
    }, []);

    // Sample data
    const transactions = [
        { dateTime: '2024-10-01 01:30', type: 'Deposit', amount: '+$200' },
        { dateTime: '2024-10-05 14:03', type: 'Withdrawal', amount: '-$50' },
        { dateTime: '2024-10-10 07:00', type: 'Deposit', amount: '+$100' },
        { dateTime: '2024-10-12 16:45', type: 'Transfer', amount: '-$150' },
    ];

    return (
        <WindowWrapper showSideNav={true}>
            <div style={{ height: "100%", padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
                <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "35px", marginBottom: "20px", color: "#57C43F", fontWeight: "bold"}}>Welcome Back, {firstName} {lastName}!</p>
                    <div style={{ position: "relative", marginRight: "20px", marginBottom: "10px" }}>
                        <img 
                            id="profile-pic"
                            src="default.png" 
                            alt="User Profile" 
                            style={{ height: "50px", width: "50px", borderRadius: "50%", cursor: "pointer" }} 
                            onClick={toggleDropdown} 
                        />
                        {dropdownOpen && (
                            <div 
                                id="dropdown" 
                                style={{
                                    borderRadius: "10%",
                                    position: "absolute",
                                    right: 0,
                                    backgroundColor: "white",
                                    boxShadow: "0 2px 10px #FFFFFF",
                                    zIndex: 1,
                                    minWidth: "150px",
                                }}
                            >
                                <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                                    <li 
                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "10%" }} 
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'} 
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={() => navigate('/accountsettings')}
                                    >
                                        Account Settings
                                    </li>
                                    <li 
                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "10%" }} 
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'} 
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={() => navigate('/employeedashboard')} //only if the customer is an employee
                                    >
                                        Change Account
                                    </li>
                                    <li 
                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "10%" }} 
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'} 
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={() => navigate('/')}
                                    >
                                        Log Out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                
                <Divider />
                <Divider />
                <div style={{ minHeight: "300px", margin: "20px 10px", fontSize: "25px", padding: "10px" }}>
                    {username}'s' Account
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{
                            minHeight: "200px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            flex: "1",
                            minWidth: "200px",
                            margin: "5px",
                            padding: "20px",
                            borderRadius: "8px", 
                            backgroundColor: "#ffffff", 
                            transition: "transform 0.2s",
                            cursor: "pointer" 
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"} 
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div><FontAwesomeIcon icon={faBuildingColumns}/>Account Balance</div>
                                <div>{accountId}</div>
                                
                            </div>
                            <div style={{ justifyContent: "flex-end" }}>

                                <Text fontSize={"60px"} marginLeft={"10px"} fontWeight={"bold"} color= "#57C43F">${balance}</Text>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", textAlign: "center" }}>
                    <div style={{ flex: 1, margin: "0 10px" }}>
                        <h2><FontAwesomeIcon style={{ margin: "0 10" }} icon={faMoneyBill} />Deposit Bills</h2>
                        <div>1. Enter amount.<br/>2. Verify and Acknowledge.</div>
                        <Button onClick={() => { navigate('/DepositBills'); }} style={{ backgroundColor: 'black', color: 'white', marginTop: "20px", width: "80%" }} colorTheme="success" variation="primary">Add Cash!</Button>
                    </div>
                    <div style={{ flex: 1, margin: "0 10px" }}>
                        <h2><FontAwesomeIcon style={{ margin: "0 10" }} icon={faUpload} />Deposit Check</h2>
                        <div>1. Upload the check.<br/>2. Verify the amount.</div>
                        <Button onClick={() => { navigate('/uploadCheque'); }} style={{ backgroundColor: 'black', color: 'white', marginTop: "20px", width: "80%" }} colorTheme="success" variation="primary">Upload Check!</Button>
                    </div>
                    <div style={{ flex: 1, margin: "0 10px" }}>
                        <h2><FontAwesomeIcon style={{ margin: "0 10" }} icon={faMoneyBillTransfer} />Transfer Funds</h2>
                        <div>Easily transfer funds in just a few clicks!</div>
                        Enter recipient's phone number. Enter the desired amount to transfer.
                        <br/>
                        <Button onClick={() => { navigate('/transferFunds'); }} style={{ backgroundColor: 'black', color: 'white', marginTop: "20px", width: "80%" }} colorTheme="success" variation="primary">Get Started!</Button>
                    </div>
                </div>

                <div style={{ display: "flex", flex: 1, marginTop: "20px" }}>
                    <div style={{ flex: 1 }}>
                        <h2>Transaction History</h2>
                        <Table 
                            highlightOnHover={true} 
                            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px #AAAAAA' }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell as="th">Date and Time</TableCell>
                                    <TableCell as="th">Transaction Type</TableCell>
                                    <TableCell as="th">Amount</TableCell>
                                    <TableCell as="th">Account ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.slice(0, 4).map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{transaction.dateTime}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>{accountId}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button 
                            style={{ margin: "10px 0px", backgroundColor: "black", color: "white"}} 
                            onClick={() => navigate('/transactionHistory')}
                        >
                            View Full History
                        </Button>
                    </div>
                </div>
            </div>
        </WindowWrapper>
    );
};

export default CustomerDashboard
