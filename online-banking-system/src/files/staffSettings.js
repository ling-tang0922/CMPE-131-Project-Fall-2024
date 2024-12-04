import { Button, Divider, TextField } from "@aws-amplify/ui-react";
import WindowWrapperManager from "../components/WindowWrapperManager";
import WindowWrapperEmployee from "../components/WindowWrapperEmployee";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StaffSettings = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountStatus, setAccountStatus] = useState(sessionStorage.getItem('accountStatus'));
    const firstName = sessionStorage.getItem('firstName')
    const lastName = sessionStorage.getItem('lastName');
    const username = sessionStorage.getItem('username');
    const bankID = sessionStorage.getItem('bankID') || '';
    const role = sessionStorage.getItem('role');
    const email = sessionStorage.getItem('email');
    const phoneNumber = sessionStorage.getItem('PhoneNumber');
    const oldpassword = sessionStorage.getItem('password');
    
    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);

    const changePassword = () => {
        alert(oldpassword + ' ' + newPassword + ' ' + confirmPassword)
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        if (newPassword === '' || confirmPassword === '') {
            alert('Please enter a password.');
            return;
        }
        if(newPassword === oldpassword){
            alert('New password cannot be the same as the old password.');
            return;
        }
        axios.put('http://localhost:4000/UpdatePassword', {
            bankID: bankID, password: newPassword,
        })
        .then(response => {
            console.log('Response received:', response.data);
            if (response.data.success) {
                console.log(response.data.password)
                sessionStorage.setItem('password', newPassword);
                alert('Password has been updated successfully.');
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            } else {
                alert("Error validating credentials");
            }
        });
    };


        const signOut = () => {
        sessionStorage.removeItem('balance');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('bankID');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phoneNumber');
        sessionStorage.removeItem('accountBalance');
        sessionStorage.removeItem('bankPin');
        sessionStorage.removeItem('accountStatus');
        navigate('/');
    }

    const changeAccount = () => {
        sessionStorage.removeItem('balance');
        sessionStorage.removeItem('firstName');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('bankID');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phoneNumber');
        sessionStorage.removeItem('accountBalance');
        sessionStorage.removeItem('bankPin');
        sessionStorage.removeItem('accountStatus');
        navigate('/CustomerLogin') 
    }
    const clickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const pfp = document.getElementById('profile-pic');
        if (dropdown && !dropdown.contains(event.target) && !pfp.contains(event.target)) {
            closeDropdown();
        }
    };
    

    const handleAccountStatus = () => {
        axios.put('http://localhost:4000/UpdateAccountStatus', {
            bankID: bankID, accountStatus: accountStatus === 'open' ? 'closed' : 'open'
        })
        .then(response => {
            console.log('Response received:', response.data);
            if (response.data.success) {
                sessionStorage.setItem('accountStatus', response.data.accountStatus);
                alert('Account status has been updated successfully.');
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            } else {
                alert("Error validating credentials");
            }
        });
        setAccountStatus(accountStatus === 'open' ? 'closed' : 'open');
    };

    useEffect(() => {
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);
    const WrapperComponent = role === 'manager' ? WindowWrapperManager : WindowWrapperEmployee;
    return (
        <WrapperComponent showSideNavEmployee={true}>
            <div style={{ height: "100%", padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
                <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "35px", marginBottom: "20px", color: "#57C43F", fontWeight: "bold"}}>Account Settings</p>
                    <div style={{ position: "relative", marginRight: "20px", marginBottom: "10px" }}>
                        <img 
                            id="profile-pic"
                            src="default.png" 
                            alt="User Profile" 
                            style={{ height: "50px", width: "50px", borderRadius: "50%", cursor: "pointer" }} 
                            onClick={toggleDropdown} 
                        />
                        {dropdownOpen && (
                            <div id="dropdown" style={{
                                borderRadius: "10%",
                                position: "absolute",
                                right: 0,
                                backgroundColor: "white",
                                boxShadow: "0 2px 10px #FFFFFF",
                                zIndex: 1,
                                minWidth: "150px",
                            }}>
                                <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                                    <li
                                        style={{
                                            padding: "10px",
                                            cursor: "pointer",
                                            borderRadius: "10%"
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={() => navigate('/staffSettings')}
                                    >
                                        Account Settings
                                    </li>
                                    <li
                                        style={{
                                            padding: "10px",
                                            cursor: "pointer",
                                            borderRadius: "10%"
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C1F2B0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                                        onClick={changeAccount}
                                    >
                                        Change Account
                                    </li>
                                    <li
                                        style={{
                                            padding: "10px",
                                            cursor: "pointer",
                                            borderRadius: "10%"
                                        }}
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
                <div style={{
                    minHeight: "300px",
                    margin: "20px 10px",
                    fontSize: "25px",
                    padding: "10px"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px",
                        padding: "20px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                    }}>
                        <h3 style={{ marginTop: "1px" }}>User Information</h3>
                        <div style={{ marginBottom: "5px" }}> <strong>First Name: </strong>{firstName}</div>
                        <div style={{ marginBottom: "5px" }}> <strong>Last Name: </strong>{lastName}</div>
                        <div style={{ marginBottom: "5px" }}> <strong>Username: </strong>{username}</div>
                        <div style={{ marginBottom: "5px" }}> <strong>Account ID: </strong>{bankID}</div>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px",
                        padding: "20px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        backgroundColor: "#FFFFFF",
                    }}>
                        <h3 style={{ marginTop: "1px" }}>Change Password</h3>
                        <TextField
                            label="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{
                                marginBottom: "10px",
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid",
                            }}
                            type="password"
                        />
                        <TextField
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                marginBottom: "10px",
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid",
                            }}
                            type="password"
                        />
                        <Button onClick={changePassword} style={{
                            backgroundColor: "#57C43F",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}>
                            Change Password
                        </Button>
                    </div>

                    
                </div>
            </div>
        </WrapperComponent>
    );
};

export default StaffSettings
