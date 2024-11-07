import { Divider, Table, TableCell, TableHead, TableRow, TableBody, SelectField } from "@aws-amplify/ui-react";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("ascending");

    // Sample
    const accounts = [
        { bankIDuser: 'e1234', totalBalance: '$0.42', transaction: '-$100', connectedAccount: 'e1234', date: '11/07/24' },
        { bankIDuser: 'e1234', totalBalance: '$100.42', transaction: '-$319.58', connectedAccount: 'e1234', date: '11/05/24' },
        { bankIDuser: 'e1234', totalBalance: '$420', transaction: '+$120', connectedAccount: 'e1234', date: '11/02/24' },
        { bankIDuser: 'e1234', totalBalance: '$300', transaction: '-$100', connectedAccount: 'e1234', date: '10/30/24' },
    ];

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
                                        onClick={() => navigate('/dashboard')}
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

export default ManagerDashboard;
