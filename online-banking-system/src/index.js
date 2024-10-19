import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from './files/LandingPage';
import '@aws-amplify/ui-react/styles.css';
import CustomerLogin from './files/CustomerLogin';
import ATMLoginForm from './files/ATMLoginForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerDashboard from './files/CustomerDashBoard';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/CustomerLogin" element={<CustomerLogin />} />
    <Route path="/dashboard" element={<CustomerDashboard/>} />
    <Route path="/ATMLoginForm" element={<ATMLoginForm />} />
    
    </Routes>
  </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
