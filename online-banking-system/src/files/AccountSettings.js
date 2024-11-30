import { Button, Divider, TextField } from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountSettings = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountStatus, setAccountStatus] = useState('open');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const bankID = sessionStorage.getItem('bankID') || {}
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    
    const toggleDropdown = () => setDropdownOpen(prev => !prev);
    const closeDropdown = () => setDropdownOpen(false);


    const fetchAccountSettings= () =>{
        axios.get('http://localhost:4000/account-settings', {
            params:{bankID: bankID}
        })
        .then(response =>{
            console.log('Response recieved:', response.data)
            if(response.data.success){
                setAccountStatus(response.data.accountStatus)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setUsername(response.data.username)
                setEmail(response.data.email)
                setPhoneNumber(response.data.PhoneNumber)
                setRole(response.data.role)
            }
        })
        .catch(error => {
            console.error('Error occurred:', error);
            if (error.response && error.response.status === 401) {
              alert("Invalid credentials");
            } else {
              alert("Error validating credentials");
            }
          })
    }
    fetchAccountSettings()
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
    const clickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const pfp = document.getElementById('profile-pic');
        if (dropdown && !dropdown.contains(event.target) && !pfp.contains(event.target)) {
            closeDropdown();
        }
    };
    
    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        else if(newPassword == 0 || confirmPassword == 0) {
            alert('Please enter a password.');
            return;
        }
        else {
            alert('Password has been changed successfully.');
        }
    };

    const handleAccountStatus = () => {
        setAccountStatus(accountStatus === 'open' ? 'closed' : 'open');
    };

    useEffect(() => {
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);

    return (
        <WindowWrapper showSideNav={true}>
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
                                        onClick={() => navigate('/AccountSettings')}
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
                        <div style={{ marginBottom: "5px" }}> <strong>Email: </strong>{email}</div>
                        <div style={{ marginBottom: "5px" }}><strong>Phone: </strong>{phoneNumber}</div>
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
                        <Button onClick={handlePasswordChange} style={{
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
                        <h3 style={{ marginTop: "1px" }}>Bank Account Status</h3>
                        <p>The account is currently {accountStatus === 'open' ? 'open' : 'closed'}.</p>
                        <Button onClick={handleAccountStatus} style={{
                            backgroundColor: "#57C43F",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}>
                            {accountStatus === 'open' ? 'Close Account' : 'Open Account'}
                        </Button>
                    </div>
                </div>
            </div>
        </WindowWrapper>
    );
};

export default AccountSettings
