import React from 'react';
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faMoneyBillTransfer,faUpload,faClockRotateLeft} from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {
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
          <MenuItem  style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faHouse} />DashBoard</MenuItem>
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faUpload} />Deposit Cheque</MenuItem>
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faMoneyBillTransfer} />Transfer Money</MenuItem>
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faClockRotateLeft} />Transaction History</MenuItem>        
        </Menu>
        

      </Sidebar>
    </ProSidebarProvider>
    </div>
  );
};

export default SideNav;