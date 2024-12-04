import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, ProSidebarProvider } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBillTransfer, faUpload, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

/**
 * SideNav Component
 * 
 * This component renders a fixed sidebar navigation menu.
 * It includes navigation links to different pages such as Dashboard, Deposit Check, and Transfer Funds.
 */
const SideNav = () => {
  const navigate = useNavigate();
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");

  return (
    // Container div for the sidebar
    <div style={{ position: "fixed" }}>
      <ProSidebarProvider>
        <Sidebar 
          rootStyles={{
            [`.ps-sidebar-container`]: {
              backgroundColor: 'black',
            },
          }} 
          style={{ height: '100vh', width: '250px', left: 0, backgroundColor: "black" }}
        >
          {/* Display user's first and last name */}
          <h2 style={{ color: "white" }}>{firstName} {lastName}</h2>
          <Menu 
            menuItemStyles={{
              button: {
                backgroundColor: 'transparent', 
                color: 'white', 
                '&:hover': {
                  backgroundColor: '#57C43F', 
                  color: 'white',
                },
              },
            }}
          >
            {/* Navigation links */}
            <MenuItem onClick={() => { navigate('/Dashboard') }} style={{ color: "white" }}>
              <FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faHouse} />Dashboard
            </MenuItem>
            <MenuItem onClick={() => { navigate('/UploadCheque') }} style={{ color: "white" }}>
              <FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faUpload} />Deposit Check
            </MenuItem>
            <MenuItem onClick={() => { navigate('/transferFunds') }} style={{ color: "white" }}>
              <FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faMoneyBillTransfer} />Transfer Funds
            </MenuItem>
            <MenuItem onClick={() => { navigate('/transactionHistory') }} style={{ color: "white" }}>
              <FontAwesomeIcon style={{ margin: "0 10", color: "white" }} icon={faClockRotateLeft} />Transaction History
            </MenuItem>
          </Menu>
        </Sidebar>
      </ProSidebarProvider>
    </div>
  );
}

export default SideNav;
