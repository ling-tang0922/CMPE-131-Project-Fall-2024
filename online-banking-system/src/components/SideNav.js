import React from 'react';
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBillTransfer, faUpload, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {
  const navigate = useNavigate();

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
            <MenuItem style={{ color: "white" }} onClick={() => navigate('/Dashboard')}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faHouse} /> Dashboard
            </MenuItem>
            <MenuItem style={{ color: "white" }} onClick={() => navigate('/Deposit')}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faUpload} /> Deposit Check
            </MenuItem>
            <MenuItem style={{ color: "white" }} onClick={() => navigate('/Transfer')}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faMoneyBillTransfer} /> Transfer Money
            </MenuItem>
            <MenuItem style={{ color: "white" }} onClick={() => navigate('/TransactionHistory')}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faClockRotateLeft} /> Transaction History
            </MenuItem>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>
    </div>
  );
};

export default SideNav;
