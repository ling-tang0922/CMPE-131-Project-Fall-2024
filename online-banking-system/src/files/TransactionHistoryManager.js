import { Divider, Table, TableCell, TableHead, TableRow, TableBody, SelectField } from "@aws-amplify/ui-react";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionHistoryManager = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("ascending");
    const bankID = sessionStorage.getItem("bankID") || {}
    const [accounts, setAccounts] = useState('')
    const [role, setRole] = useState('')
    axios.get('http://localhost:4000/totalTransactionHistory',{
            params: {bankID: bankID }
        })
    .then(response =>{
        if(response.data.success){
            setAccounts(response.data.transactionHistory)
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
    const signOut = () => {
        sessionStorage.removeItem('bankID')
        navigate('/')
    }
    const changeAccount = () => {
        sessionStorage.removeItem('bankID')
        if(role === 'customer'){
            navigate('/CustomerLogin')
        }
        else if(role === 'employee' || role === 'manager'){
            navigate('/EmployeeLogin')
        }
            
    }
    const sortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const sortedAccounts = accounts.sort((a, b) => sortOrder === "ascending"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date));

    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    const clickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const profilePic = document.getElementById('profile-pic');
        if (dropdown && !dropdown.contains(event.target) && !profilePic.contains(event.target)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);

    return (
        <WindowWrapperEmployee showSideNavEmployee={true}>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 style={{ fontSize: "35px", color: "#57C43F", fontWeight: "bold" }}>Manager Dashboard: User's Transaction History</h1>
                    <div style={{ position: "relative", marginRight: "20px" }}>
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
                                        onClick={changeAccount}
                                    >
                                        Change Account
                                    </li>
                                    <li
                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "10%" }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={signOut}
                                    >
                                        Log Out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <Divider />
                <div style={{ padding: "20px", backgroundColor: 'transparent' }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <SelectField
                            label="Sort by Date"
                            value={sortOrder}
                            onChange={sortChange}
                            style={{ width: "200px" }}
                        >
                            <option value="ascending">Oldest to Recent</option>
                            <option value="descending">Recent to Oldest</option>
                        </SelectField>
                    </div>
                    <Table
                        highlightOnHover={true}
                        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px #AAAAAA' }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell as="th">BankID</TableCell>
                                <TableCell as="th">Total Balance</TableCell>
                                <TableCell as="th">Transaction</TableCell>
                                <TableCell as="th">Connected Account</TableCell>
                                <TableCell as="th">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedAccounts.map((account, index) => (
                                <TableRow key={index}>
                                    <TableCell>{account.bankIDuser}</TableCell>
                                    <TableCell>{account.totalBalance}</TableCell>
                                    <TableCell>{account.transaction}</TableCell>
                                    <TableCell>{account.connectedAccount}</TableCell>
                                    <TableCell>{account.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </WindowWrapperEmployee>
    );
};

export default TransactionHistoryManager;
