import { Button, Divider, Table, TableCell, TableHead, TableRow, TableBody } from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUpload, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const clickOutside = (event) => {
        const dropdown = document.getElementById('dropdown');
        const profilePic = document.getElementById('profile-pic');
        if (dropdown && !dropdown.contains(event.target) && !profilePic.contains(event.target)) {
            closeDropdown();
        }
    };

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
            <div style={{ height: "100vh", padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
                <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: "40px", marginBottom: "20px", color: "#57C43F" }}>Welcome Back, First Last!</p>
                    <div style={{ position: "relative", marginRight: "20px", marginBottom: "10px" }}>
                        <img 
                            id="profile-pic"
                            src="default.png" 
                            alt="User Profile" 
                            style={{ height: "48px", width: "48px", borderRadius: "50%", cursor: "pointer" }} 
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

                <div style={{ display: "flex", flex: 1, marginTop: "20px" }}>
                    <div style={{ flex: 1, marginRight: "20px" }}>
                        <div style={{ minHeight: "300px", margin: "20px 10px", fontSize: "1.5em", padding: "10px" }}>
                            <div style={{ display: "flex" }}>
                                <div style={{
                                    minHeight: "200px",
                                    boxShadow: "0 4px 10px #AAAAAA",
                                    flex: "1",
                                    width: "150px",
                                    margin: "5px",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    backgroundColor: "#FFFFFF",
                                    transition: "transform 0.2s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderRadius: "5px",
                                        padding: "10px",
                                    }}>
                                        <div style={{ fontSize: "30px", fontWeight: "bold" }}>Account Balance:</div>
                                        <div style={{ fontSize: "30px", fontWeight: "bold" }}>***456</div>
                                    </div>
                                    <div style={{ fontSize: "70px", fontWeight: "bold", marginTop: "15px", color: "#57C43F"}}>$4200.00</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ flex: 1, marginRight: "10px" }}>
                                <h3><FontAwesomeIcon style={{ margin: "0 10" }} icon={faMoneyBill} />Deposit Cash</h3>
                                <div>1. Enter the amount.<br />2. Verify and acknowledge.</div>
                                <Button style={{ backgroundColor: '#57C43F', color: 'white', borderRadius: '20px', padding: '10px 20px', transition: 'background-color 0.3s' }} margin="20px 0" width={"50%"} colorTheme="success" variation="primary" 
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#45A030"}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#57C43F"}
                                >Add Cash!</Button>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3><FontAwesomeIcon style={{ margin: "0 10" }} icon={faUpload} />Deposit Check</h3>
                                <div>1. Upload PNG files of front and back of the check.<br />2. Verify the amount.</div>
                                <Button style={{ backgroundColor: '#57C43F', color: 'white', borderRadius: '20px', padding: '10px 20px', transition: 'background-color 0.3s' }} margin="20px 0" width={"50%"} colorTheme="success" variation="primary" 
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#45A030"}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#57C43F"}
                                >Upload Check!</Button>
                             </div>
                        </div>
                    </div>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.slice(0, 3).map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{transaction.dateTime}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button 
                            style={{ marginTop: "10px", backgroundColor: "#57C43F", color: "white", borderRadius: "20px" }} 
                            onClick={() => navigate('/transactionHistory')}
                        >
                            See More 
                            <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} />
                        </Button>
                    </div>
                </div>
            </div>
        </WindowWrapper>
    );
}

export default CustomerDashboard;

