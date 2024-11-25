import React from 'react';
import { useNavigate, useState } from "react";
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faMoneyBillTransfer,faUpload,faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const SideNav = ({style={}}) => {
  const navigate = useNavigate();
  const bankID = localStorage.getItem("bankID")
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  axios.get('http://localhost:4000/account-settings',{
    params: {bankID: bankID }
  })
  .then(response =>{
    if(response.data.success){
      setFirstName(response.data.firstName)
      setLastName(response.data.lastName)
    }
  })
  .catch(error =>{
    if(error.response && error.response.status === 401){
      alert("Invalid credentials")
    } 
    else{
      alert("Error validating credentials")
    }
  })
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
          <MenuItem onClick={()=>{navigate('/dashboard')}}  style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faHouse} />Dashboard</MenuItem>
          <MenuItem onClick={()=>{navigate('/UploadCheque')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faUpload} />Deposit Check</MenuItem>
          <MenuItem onClick={()=>{navigate('/transferFunds')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faMoneyBillTransfer} />Transfer Funds</MenuItem>
          <MenuItem onClick={()=>{navigate('/transactionHistory')}} style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faClockRotateLeft} />Transaction History</MenuItem>        
        </Menu>
      </Sidebar></ProSidebarProvider></div>)
};

export default SideNav;
