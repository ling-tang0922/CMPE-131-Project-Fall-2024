import React from 'react';
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faMoneyBillTransfer,faUpload,faClockRotateLeft,faGear,faDoorOpen} from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {
  return (
    <div style={{ position: "fixed" }}>
      <ProSidebarProvider>
        <Sidebar rootStyles={{
          [`.ps-sidebar-container`]: {
            backgroundColor: 'black',
          },
        }} style={{ height: '100vh', width: '250px', left: 0, backgroundColor: "black" }}>
          <h2 style={{ paddingLeft: "20px", color: "white", marginTop: "20px" }}>Customer Name</h2>
          <Menu menuItemStyles={{
            button: {
              backgroundColor: 'transparent', 
              color: 'white',
              '&:hover': {
                backgroundColor: "#1C8F0F", 
                color: 'white',
              },
            },
          }}>
          <MenuItem  style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faHouse} />Dashboard</MenuItem>
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faUpload} />Deposit Check</MenuItem>
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faMoneyBillTransfer} />Transfer Money</MenuItem>
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faClockRotateLeft} />Transaction History</MenuItem>  
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faGear} />Account Settings</MenuItem>   
          <MenuItem style={{color:"white"}}><FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faDoorOpen} />Log Out</MenuItem>            
        </Menu>
        

      </Sidebar>
    </ProSidebarProvider>
    </div>
  );
};

export default SideNav;