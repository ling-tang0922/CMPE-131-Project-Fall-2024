import React from 'react';
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faMoneyBillTransfer,faUpload,faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";

const SideNav = ({style={}}) => {
  const navigate = useNavigate();
  return (
    <div style={{position:"fixed"}}>
    <ProSidebarProvider>
      <Sidebar rootStyles={{
        [`.ps-sidebar-container`]: {
          backgroundColor: 'black',
        },
      }} style={{ height: '100vh', width: '250px', left: 0,backgroundColor:"black"}}>
        <h2 style={{paddingLeft:"20px",color:"white"}}>Customer Name</h2>
        <Menu menuItemStyles={{
          button: {
            backgroundColor: 'transparent', // Default background
            color: 'white', // Default text color
            '&:hover': {
              backgroundColor: '#333333', // Teal hover color
              color: 'white', // Text color on hover
            },
          },
        }}>
          <MenuItem onClick={()=>{navigate('/dashboard')}}  style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faHouse} />DashBoard</MenuItem>
          <MenuItem onClick={()=>{navigate('/UploadCheque')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faUpload} />Deposit Cheque</MenuItem>
          <MenuItem onClick={()=>{navigate('/transferFunds')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faMoneyBillTransfer} />Transfer Funds</MenuItem>
          <MenuItem onClick={()=>{navigate('/transactionHistory')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faClockRotateLeft} />Transaction History</MenuItem>        
        </Menu>
      </Sidebar></ProSidebarProvider></div>)
};

export default SideNav;
