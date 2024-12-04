import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from './files/LandingPage';
import '@aws-amplify/ui-react/styles.css';
import AboutUs from './files/AboutUs';
import StaffSettings from './files/staffSettings';
import CustomerLogin from './files/CustomerLogin';
import ATMLoginForm from './files/ATMLoginForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerDashboard from './files/CustomerDashBoard';
import TransactionHistory from './files/TransactionHistory';
import ATMDashboard from './files/ATMDashboard';
import DepositCash from './files/DepositBills';
import TransferFunds from './files/TransferFunds';
import UploadCheque from './files/UploadCheque';
import AccountSettings from './files/AccountSettings';
import EmployeeLogin from './files/EmployeeLogin';
import EmployeeDashboard from './files/EmployeeDashboard';
import TransactionHistoryEmployee from './files/TransactionHistoryEmployee';
import EmployeeManagement from './files/EmployeeManagement'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/AboutUs" element={<AboutUs/>} />
    <Route path="/CustomerLogin" element={<CustomerLogin />} />
    <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
    <Route path="/Dashboard" element={<CustomerDashboard/>} />
    <Route path="/ATMLoginForm" element={<ATMLoginForm />} />
    <Route path="/ATMDashboard" element={<ATMDashboard />} />
    <Route path="/TransactionHistory" element={<TransactionHistory />} />
    <Route path="/DepositBills" element={<DepositCash />} />
    <Route path="/transferFunds" element={<TransferFunds />} />
    <Route path="/uploadCheque" element={<UploadCheque />} />
    <Route path="/EmployeeDashboard" element={<EmployeeDashboard/>} />
    <Route path="/AccountSettings" element={<AccountSettings/>} />
    <Route path="/TransactionHistoryEmployee" element={<TransactionHistoryEmployee/>} />
    <Route path="/EmployeeManagement" element={<EmployeeManagement/>} />
    <Route path="/staffSettings" element={<StaffSettings />} />
    </Routes>
  </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
