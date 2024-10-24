import { Button, Divider, Table, TableCell, TableHead, TableRow, TableBody, Text } from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUpload, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {faBuildingColumns} from "@fortawesome/free-solid-svg-icons";
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
            <div style={{ height: "100%", padding: "20px", display: "flex", flexDirection: "column", backgroundColor: 'transparent' }}>
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
        <div>
            <div style={{minHeight:"300px",margin:"20px 10px",fontSize:"1.5em",padding:"10px"}}
            >My Account
            <div style={{"display":"flex",flexDirection:"column"}}>
            <div style={{
                minHeight: "200px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Enhanced shadow
                flex: "1",
                minWidth: "200px",
                margin: "5px",
                padding: "20px", // Increased padding for better spacing
                borderRadius: "8px", // Rounded corners
                backgroundColor: "#ffffff", // White background for contrast
                transition: "transform 0.2s", // Smooth transition for hover effect
                cursor: "pointer" // Pointer cursor for interactivity
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"} // Hover effect
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} // Reset hover effect
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div><FontAwesomeIcon icon={faBuildingColumns}/>Account Balance</div>
                    <div>***456</div>
                </div>
                <div style={{justifyContent:"flex-end"}}>
                    <Text fontSize={"xxl"} marginLeft={"10px"}>$4200</Text>
                </div>
            </div>

                 </div>
            </div>
            <h2>Deposit Cash</h2>
            <div style={{display:"flex"}}>
                <div style={{"flex":1}}>
                    <h3><FontAwesomeIcon style={{ margin: "0 10"}} icon={faMoneyBill} />Deposit Bills
                    </h3>
                    <div>1. Enter amount.<br/>2.Verify and Acknowledge</div>
                    <Button onClick={()=>{navigate('/DepositBills')}} style={{ backgroundColor: 'black', color: 'white' }} margin="20px 0" width={"50%"} colorTheme="success" variation="primary">Add Cash!</Button>
                </div>
                <div style={{"flex":1}}><h3><FontAwesomeIcon style={{ margin: "0 10"}} icon={faUpload} />Deposit Cheque</h3>
                <div>1. Upload the cheque.<br/>2. Verify Amount</div>
                <Button onClick={()=>{navigate('/uploadCheque')}} style={{ backgroundColor: 'black', color: 'white' }} margin="20px 0" width={"50%"} colorTheme="success" variation="primary">Upload Cheque!</Button>

            </div>
            
        </div>
        </div>
        <h2 style={{"marginTop":'5em'}}>Transfer funds</h2>
            <div style={{"margin":"10px 0"}}>
                Easily transfer funds in just a few clicks! Use the shortcut below to send money instantly:
                <br/>
                <strong>Recipient: </strong>
                Enter recipient's phone number.
                <br/>
                <strong>Amount: </strong> Enter the desired amount to transfer.
                <div>
                    <Button onClick={()=>{navigate('/transferFunds')}} style={{ backgroundColor: 'black', color: 'white'}} margin="20px 0" width={"25%"} colorTheme="success" variation="primary">Get Started!</Button>
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
        style={{ margin: "10px 0px", backgroundColor: "black", color: "white"}} 
        onClick={() => navigate('/transactionHistory')}
    >
        See More 
        <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} />
    </Button>
</div>
</div>

        </div>

    </WindowWrapper>)
}

export default CustomerDashboard;

