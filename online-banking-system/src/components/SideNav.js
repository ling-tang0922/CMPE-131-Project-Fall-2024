import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faMoneyBillTransfer,faUpload,faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const SideNav = () => {
  const navigate = useNavigate();
  const firstName = sessionStorage.getItem("firstName")
  const lastName = sessionStorage.getItem("lastName")
  
  return (
    <div style={{position:"fixed"}}>
    <ProSidebarProvider>
      <Sidebar rootStyles={{
        [`.ps-sidebar-container`]: {
          backgroundColor: 'black',
        },
      }} style={{ height: '100vh', width: '250px', left: 0,backgroundColor:"black"}}>
        <h2 style={{color:"white"}}>{firstName} {lastName}</h2>
        <Menu menuItemStyles={{
          button: {
            backgroundColor: 'transparent', 
            color: 'white', 
            '&:hover': {
              backgroundColor: '#57C43F', 
              color: 'white',
            },
          },
        }}>
          <MenuItem onClick={()=>{navigate('/Dashboard')}}  style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faHouse} />Dashboard</MenuItem>
          <MenuItem onClick={()=>{navigate('/UploadCheque')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faUpload} />Deposit Check</MenuItem>
          <MenuItem onClick={()=>{navigate('/transferFunds')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faMoneyBillTransfer} />Transfer Funds</MenuItem>
          <MenuItem onClick={()=>{navigate('/TransactionHistory')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faClockRotateLeft} />Transaction History</MenuItem>        
        </Menu>
      </Sidebar></ProSidebarProvider></div>)
};

export default SideNav;
