import React from 'react';
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileInvoice, faChartLine, faClipboardList, faCog } from '@fortawesome/free-solid-svg-icons';

const SideNavEmployee = ({style={}}) => {
  const navigate = useNavigate();
  return (
    <div style={{position:"fixed"}}>
        <Sidebar rootStyles={{
          [`.ps-sidebar-container`]: {
            backgroundColor: 'black',
          },
        }} style={{ height: '100vh', width: '250px', left: 0, backgroundColor:"black"}}>
          <h2 style={{color:"white"}}>Employee Name</h2>
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
            <MenuItem onClick={() => {navigate('/employeeManagement')}} style={{color:"white"}}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faUsers} />
              Employees
            </MenuItem>
            <MenuItem onClick={() => {navigate('/reports')}} style={{color:"white"}}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faChartLine} />
              Account Reports
            </MenuItem>
            <MenuItem onClick={() => {navigate('/transactions')}} style={{color:"white"}}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faClipboardList} />
              Transactions
            </MenuItem>
            <MenuItem onClick={() => {navigate('/settings')}} style={{color:"white"}}>
              <FontAwesomeIcon style={{ margin: "0 10px", color: "white" }} icon={faCog} />
              Settings
            </MenuItem>
          </Menu>
        </Sidebar>
    </div>
  );
};

export default SideNavEmployee;
