import { Divider, Table, TableCell, TableHead, TableRow, TableBody, TextField, SelectField, Button } from "@aws-amplify/ui-react";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee"
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

const ManagerDashboard = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("ascending");
    const [message, setMessage] = useState('')
    const bankID = location.state
    const accType = 'employee'
    const [reqType, setReqType] = useState('')
    
    // Sample

    
    const [accounts, setAccounts] = useState([
        { first: 'Robbert', last: 'Bobbert', email: 'robbertbobbert@gmail.com', username: 'Robbert123', bankID: 'e1234', password: 'password', balance: '$0.42', bankPIN: '9481' },
        { first: 'Jannet', last: 'Rose', email: 'jannet.rose321@gmail.com', username: 'Jannet321', bankID: 'e7622', password: 'password', balance: '$10000.84', bankPIN: '4135' },
        { first: 'Sam', last: 'Darnold', email: 'samlikesbeefsticks@gmail.com',  username: 'Beefsticks', bankID: 'e2314', password: 'password', balance: '$13213.31', bankPIN: '7545' },
        { first: 'Michael', last: 'Jordan', email: 'michaelJordan@gmail.com',  username: 'leafcar', bankID: 'e9876', password: 'password', balance: '$58912.32', bankPIN: '7683' },
        { first: 'Adam', last: 'Smith', email: 'appledawgz@gmail.com',  username: 'AppleDawgz', bankID: 'e6792', password: 'password', balance: '$8912.41', bankPIN: '5133' },
        { first: 'Samantha', last: 'Zhou', email: 'samanthazhou@gmail.com',  username: 'samantha_z098', bankID: 'e0944', password: 'password', balance: '$124.04', bankPIN: '5341' },
    ]);
    // Test this last!!!!
    const updateAccountList = async () => {
        try {
            const accListResponse = await axios.get('http://localhost:4000/transaction-history', {
                bankID : bankID,
                reqType: reqType
            })
            setAccounts(accListResponse.data.accounts)
        }
        catch(error){
            console.error("Error updating account balance")
            setMessage("Error updating account balance")
        }
    }

    const searchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const sortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredSorted = accounts
        .filter(account => account.username.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => sortOrder === "ascending"
            ? a.first.localeCompare(b.first)
            : b.first.localeCompare(a.first));

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
                    <h1 style={{ fontSize: "35px", color: "#57C43F", fontWeight: "bold" }}>Manager Dashboard</h1>
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
                        <TextField
                            label="Search Accounts"
                            placeholder="Enter username"
                            value={searchTerm}
                            onChange={searchChange}
                            style={{ marginRight: "20px", width: "300px" }}
                        />
                        <SelectField
                            label="Sort by First Name"
                            value={sortOrder}
                            onChange={sortChange}
                            style={{ width: "200px" }}
                        >
                            <option value="ascending">A-Z</option>
                            <option value="descending">Z-A</option>
                        </SelectField>
                    </div>
                    <Table
                        highlightOnHover={true}
                        style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 10px #AAAAAA' }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell as="th">First Name</TableCell>
                                <TableCell as="th">Last Name</TableCell>
                                <TableCell as="th">Email</TableCell>
                                <TableCell as="th">Username</TableCell>
                                <TableCell as="th">BankID</TableCell>
                                <TableCell as="th">Password</TableCell>
                                <TableCell as="th">Balance</TableCell>
                                <TableCell as="th">Transaction History</TableCell>
                                <TableCell as="th">Bank PIN</TableCell>
                                <TableCell as="th"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSorted.map((account, index) => (
                                <TableRow key={index}>
                                    <TableCell>{account.first}</TableCell>
                                    <TableCell>{account.last}</TableCell>
                                    <TableCell>{account.email}</TableCell>
                                    <TableCell>{account.username}</TableCell>
                                    <TableCell>{account.bankID}</TableCell>
                                    <TableCell>{account.password}</TableCell>
                                    <TableCell>{account.balance}</TableCell>
                                    <TableCell>
                                        <Button
                                            variation="link"
                                            style={{
                                                backgroundColor: '#57C43F',
                                                color: 'white',
                                                padding: '10px 20px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                textAlign: 'center'
                                            }}
                                            onClick={() => navigate('/transactionhistorymanager')}
                                        >
                                            View Transaction History
                                        </Button>
                                    </TableCell>
                                    <TableCell>{account.bankPIN}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variation="destructive" 
                                            style={{
                                                backgroundColor: '#8E1600',
                                                color: '#FFFFFF',
                                                padding: '10px 20px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                textAlign: 'center'
                                            }}
                                            >
                                            Delete Account
                                        </Button>
                                    </TableCell>
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
