import { Button, Divider, Table, TableCell, TableHead, TableRow,TableBody } from "@aws-amplify/ui-react";
import WindowWrapper from "../components/WindowWrapper";

import React,{useState,useEffect} from "react";
import SideNav from "../components/SideNav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill,faUpload } from "@fortawesome/free-solid-svg-icons";

const CustomerDashboard = () =>{

    return (<WindowWrapper showSideNav={true}>
        <div style={{"height":"100vh"}}>
            <p style={{fontSize:"2em"}}>Welcome Back Customer Name!</p>
            <Divider/>
            <div style={{minHeight:"300px",margin:"20px 10px",fontSize:"1.5em",padding:"10px"}}
            >My Account
            <div style={{"display":"flex"}}>
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
                    <div>Savings Account</div>
                    <div>***456</div>
                </div>
                <div style={{ fontSize: "0.7em", marginTop: "5px" }}>Balance: $4200</div>
            </div>

                 </div>
            </div>
            <h2>Deposit Cash</h2>
            <div style={{display:"flex"}}>
                <div style={{"flex":1}}>
                    <h3><FontAwesomeIcon style={{ margin: "0 10"}} icon={faMoneyBill} />Deposit Bills
                    </h3>
                    <div>1. Enter amount.<br/>2.Verify and Acknowledge</div>
                    <Button style={{ backgroundColor: 'black', color: 'white' }} margin="20px 0" width={"50%"} colorTheme="success" variation="primary">Add Cash!</Button>
                </div>
                <div style={{"flex":1}}><h3><FontAwesomeIcon style={{ margin: "0 10"}} icon={faUpload} />Deposit Cheque</h3>
                <div>1. Upload the cheque.<br/>2. Verify Amount</div>
                <Button style={{ backgroundColor: 'black', color: 'white' }} margin="20px 0" width={"50%"} colorTheme="success" variation="primary">Upload Cheque!</Button>

                </div>
            </div>
            <h2>Transaction History</h2>
            <Table highlightOnHover={true}>
                <TableHead>
                    <TableRow>
                        <TableCell as="th">TimeStamp</TableCell>
                        <TableCell as="th">Transaction Type</TableCell>
                        <TableCell as="th">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>-</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </div>

    </WindowWrapper>)
}
export default CustomerDashboard;
