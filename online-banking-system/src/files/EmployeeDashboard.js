import { Divider, Table, TableCell, TableHead, TableRow, TableBody, TextField, SelectField, Button } from "@aws-amplify/ui-react";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee"
import WindowWrapperManager from "../components/WindowWrapperManager"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const EmployeeDashboard = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("ascending");
    const role = sessionStorage.getItem("role")
    const [accounts, setAccounts] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:4000/allAccounts-employee', {
            params:{role: 'customer'}
        })
        .then(response=>{
            if(response.data.success){
              setAccounts(response.data.accountsToDisplay)
            }
        })
        .catch(error=>{
            if(error.response && error.response.status === 401){
              alert("Invalid credentials")
            }else{
              alert("Error validating credentials")
            }
        })
    },[])
    const storeIDandNavigate = (customerID) => {
        sessionStorage.setItem("customerID", customerID)
        navigate('/TransactionHistoryEmployee')
    }
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
    const deleteAccount = (bankID) => {
        axios.delete('http://localhost:4000/delete-account',{
            data: {bankID: bankID, role: 'customer'}
        })
        .then(response=>{
            if(response.data.success){
            }
        })
        .catch(error=>{
            if(error.response && error.response.status === 401){
                alert("Invalid credentials")
            }else{
                alert("Error validating credentials")
            }
        })

        axios.delete('http://localhost:4000/deleteAccountHistory',{
            data: {bankID}
        })
        .then(response=>{
            if(response.data.success){
                alert('Account history and data has been deleted')
                window.location.reload()
            }
        })
        .catch(error=>{
            if(error.response && error.response.status === 401){
                alert("Invalid credentials")
            }else{
                alert("Error validating credentials")
            }
        })
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
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName));

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
    const WrapperComponent = role === 'manager' ? WindowWrapperManager : WindowWrapperEmployee;

    return (
        <WrapperComponent showSideNavEmployee={true}>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1 style={{ fontSize: "35px", color: "#57C43F", fontWeight: "bold" }}>{role} dashboard</h1>
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
                                        onClick={() => navigate('/StaffSettings')}
                                    >
                                        Account Settings
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
                                <TableCell as="th">Phone Number</TableCell>
                                <TableCell as="th">Email</TableCell>
                                <TableCell as="th">Username</TableCell>
                                <TableCell as="th">Password</TableCell>
                                <TableCell as="th">BankID</TableCell>
                                <TableCell as="th">Account Balance</TableCell>
                                <TableCell as="th">Bank PIN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredSorted.map((account, index) => (
                                <TableRow key={index}>
                                    <TableCell>{account.firstName}</TableCell>
                                    <TableCell>{account.lastName}</TableCell>
                                    <TableCell>{account.PhoneNumber}</TableCell>
                                    <TableCell>{account.email}</TableCell>
                                    <TableCell>{account.username}</TableCell>
                                    <TableCell>{account.password}</TableCell>
                                    <TableCell>{account.bankID}</TableCell>
                                    <TableCell>${account.accountBalance}</TableCell>
                                    <TableCell>{account.bankPin}</TableCell>
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
                                            onClick={() => storeIDandNavigate(account.bankID)}
                                        >
                                            View Transaction History
                                        </Button>
                                    </TableCell>
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
                                            onClick={()=> deleteAccount(account.bankID)}
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
        </WrapperComponent>
    );
};

export default EmployeeDashboard;
