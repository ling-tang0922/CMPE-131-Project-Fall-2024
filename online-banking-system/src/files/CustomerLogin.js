import React, { useState } from "react";
import { CiUser, CiLock, CiMail, CiSquareChevRight, CiPhone } from "react-icons/ci";
import WindowWrapper from "../components/WindowWrapper";
import axios from "axios";
import NavBar from "../components/NavBar"
import { useNavigate } from 'react-router-dom'
import {
  Input,
  Label,
  Flex,
  Button,
  Tabs
  
} from "@aws-amplify/ui-react";

const welcomeMSG = (
  <>
    <h1 style={{ textAlign: "center", marginTop: "10%", marginBottom: "0" }}>
      Welcome Back!
    </h1>
    <p style={{ textAlign: "center", marginTop: "0%" }}>
      Please enter your details to access your account.
    </p>
  </>
);

const getStartedMSG = (
  <>
    <h1 style={{ textAlign: "center", marginTop: "6%", marginBottom: "0" }}>
      Get Started!
    </h1>
    <p style={{ textAlign: "center", marginTop: "0%" }}>
      Please fill out your information to get started.
    </p>
  </>
);


const CustomerLogin = () => {

  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Login");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPass] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  
  
  // Backend:
  const generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  const handleLogin = () => {
    


    axios.get('http://localhost:4000/validate-credentials-userLogin', {
      params: { username: username, password: password}
    })
    
    .then(response => {
      console.log('Response received:', response.data);
      if (response.data.success) {
        sessionStorage.setItem('bankID', response.data.bankID);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('firstName', response.data.firstName);
        sessionStorage.setItem('lastName', response.data.lastName);
        sessionStorage.setItem('PhoneNumber', response.data.PhoneNumber);
        sessionStorage.setItem('accountBalance', response.data.accountBalance);
        sessionStorage.setItem('username', response.data.username);
        sessionStorage.setItem('password', response.data.password);
        sessionStorage.setItem('bankPin', response.data.bankPin);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('accountStatus', response.data.accountStatus);
        navigate('/DashBoard');
      }
    })

    .catch(error => {
      console.error('Error occurred:', error);
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Error validating credentials");
      }
    })
  }

  const generateID = () => {
    return new Promise((resolve, reject) => {
        const IDcheck = 'e' + (Math.floor(1000 + Math.random() * 9000)).toString();
        axios.get('http://localhost:4000/account-settings', {
            params: { bankID: IDcheck }
        })
        .then(response => {
            if (response.data.success) {
                // If the ID exists, generate a new one
                generateID().then(resolve).catch(reject);
            } else {
                // If the ID does not exist, resolve with the new ID
                resolve(IDcheck);
            }
        })
        .catch(error => {
            // Handle errors gracefully
            console.error('Error checking ID:', error);
            // Assuming that an error means the ID does not exist
            resolve(IDcheck);
        });
    });
};
  const checkValues = () => {
    if (!username || !password || !firstName || !lastName || !PhoneNumber || !email) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    axios.get('http://localhost:4000/checkInputs',{
      params: { username: username, email: email, PhoneNumber: PhoneNumber}
    })
    .then(response => {
      console.log('Response received:', response.data);
      if (response.data.success) {
        handleSignUp();
      }
      else{
        alert("Use a unique Username, Email, and Phone Number");
        return false
      }
    })
    .catch(error => {
      console.error('Error occurred:', error);
      alert("Error getting accounts")
    })
  };
  const handleSignUp = () => {
    
    const bankPin = generatePin();
    generateID().then(newBankID => {
        axios.post('http://localhost:4000/new-account', {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            PhoneNumber: PhoneNumber,
            email: email,
            accountBalance: 0,
            bankID: newBankID,
            bankPin: bankPin,
            role: 'customer'
        })
        .then(response => {
            if (response.data.success) {
                alert("Account Created");
                sessionStorage.setItem('bankID', newBankID);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('firstName', firstName);
                sessionStorage.setItem('lastName', lastName);
                sessionStorage.setItem('PhoneNumber', PhoneNumber);
                sessionStorage.setItem('accountBalance', 0);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('accountStatus', 'open')
                sessionStorage.setItem('bankPin', bankPin);
                navigate('/DashBoard');
            }
        })
        .catch(error => {
            alert("Error creating new account");
            console.error('Error occurred:', error);
        });
    }).catch(error => {
        alert("Error generating bank ID");
        console.error('Error occurred:', error);
    });
};
  //
  return (
    <WindowWrapper>
      <NavBar></NavBar>
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        {activeTab === "Login" ? welcomeMSG : getStartedMSG}
        <div
          style={{
            margin: "10%",
            marginTop: "0%",
            minWidth: "250px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(76, 175, 80, 0.5)",
            borderRadius: "10px",
            justifyContent: "center",
            marginRight: "30%",
            marginLeft: "30%",
            viewport: "width=device-width, initial-scale=1",
          }}
        >
          <Tabs
            spacing="equal"
            justifyContent="flex-start"
            indicatorPosition="top"
            defaultValue="Login"
            onValueChange={(value) => setActiveTab(value)}
            items={[
              {
                label: "Login",
                value: "Login",
                content: (
                  <div style={{ padding: "10px" }}>
                    <Flex direction="column" gap="default">
                      <Label htmlFor="first_name">Username:</Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CiUser
                          style={{
                            marginLeft: "10px",
                            marginBottom: "3px",
                            fontSize: "1.3rem",
                            position: "absolute",
                          }}
                        />
                        <Input
                          value = {username}
                          type = "text"
                          placeholder="Enter Username"
                          name="username"
                          onChange={(e)=> setUsername(e.target.value)}
                          style={{ paddingLeft: "35px" }}
                        />
                      </div>
                      <Label htmlFor="first_name">Password:</Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CiLock
                          style={{
                            marginLeft: "10px",
                            marginBottom: "3px",
                            fontSize: "1.3rem",
                            position: "absolute",
                          }}
                        />
                        <Input
                          value={password}
                          type="password"
                          placeholder="Enter Password"
                          name="username"
                          style={{ paddingLeft: "35px" }}
                          onChange={(e)=>setPassword(e.target.value)}
                        />
                      </div>

                      <Button onClick={handleLogin} variation="primary" colorTheme="success">
                        Login
                      </Button>
                    </Flex>
                  </div>
                ),
              },
              {
                label: "Sign Up",
                value: "SignUp",
                content: (
                  <div style={{ padding: "10px" }}>
                    <Flex direction="column" gap="small">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <div style={{ width: "49%" }}>
                          <Label htmlFor="first_name">First Name:</Label>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <CiSquareChevRight
                              style={{
                                marginLeft: "10px",
                                marginBottom: "2px",
                                fontSize: "1.3rem",
                                position: "absolute",
                              }}
                            />
                            <Input
                              placeholder="Enter First Name"
                              value = {firstName}
                              onChange={(e)=>setFirstName(e.target.value)}
                              name="firstName"
                              style={{ paddingLeft: "35px" }}
                            />
                          </div>
                        </div>

                        <div style={{ width: "49%" }}>
                          <Label htmlFor="last_name">Last Name:</Label>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <CiSquareChevRight
                              style={{
                                marginLeft: "10px",
                                marginBottom: "2px",
                                fontSize: "1.3rem",
                                position: "absolute",
                              }}
                            />
                            <Input
                              placeholder="Enter Last Name"
                              value ={lastName}
                              onChange={(e)=>setLastName(e.target.value)}
                              name="lastName"
                              style={{ paddingLeft: "35px" }}
                            />
                          </div>
                        </div>
                      </div>
                      <Label htmlFor="first_name">Username:</Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CiUser
                          style={{
                            marginLeft: "10px",
                            marginBottom: "3px",
                            fontSize: "1.3rem",
                            position: "absolute",
                          }}
                        />
                        <Input
                          placeholder="Enter Username"
                          value = {username}
                          onChange={(e)=>setUsername(e.target.value)}
                          name="username"
                          style={{ paddingLeft: "35px" }}
                        />
                      </div>
                      <Label htmlFor="first_name">Password:</Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CiLock
                          style={{
                            marginLeft: "10px",
                            marginBottom: "3px",
                            fontSize: "1.3rem",
                            position: "absolute",
                          }}
                        />
                        <Input
                          type="password"
                          value = {password}
                          onChange={(e)=>setPassword(e.target.value)}
                          placeholder="Enter Password"
                          name="password"
                          style={{ paddingLeft: "35px" }}
                        />
                      </div>

                      <Label htmlFor="first_name">Confirm Password:</Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CiLock
                          style={{
                            marginLeft: "10px",
                            marginBottom: "3px",
                            fontSize: "1.3rem",
                            position: "absolute",
                          }}
                        />
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          value ={confirmPassword}
                          onChange={(e)=>setConfirmPass(e.target.value)}
                          name="confirmPassword"
                          style={{ paddingLeft: "35px" }}
                        />
                      </div>
                      <Label htmlFor="first_name">Email:</Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <CiMail
                          style={{
                            marginLeft: "10px",
                            marginBottom: "1px",
                            fontSize: "1.3rem",
                            position: "absolute",
                          }}
                        />
                        <Input
                          placeholder="bank@Ebankify.com"
                          value = {email}
                          onChange = {(e)=>setEmail(e.target.value)}
                          name="email"
                          style={{ paddingLeft: "35px" }}
                        />
                      </div>
                      <Label htmlFor="first_name">Phone Number:</Label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                      <CiPhone
                          style={{
                            marginLeft: "10px",
                            marginBottom: "1px",
                            fontSize: "1.3rem",
                            position: "absolute",
                          }}
                        />
                      <input
                        style={{ paddingLeft: "35px" }}
                        type="tel"
                        label="Phone number:"
                        value={PhoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="234-567-8910"
                        aria-label="Phone number"
                        required
                      />
                      </div>
                      <Button onClick={checkValues} variation="primary" colorTheme="success">
                        Sign Up
                      </Button>
                    </Flex>{" "}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </WindowWrapper>
  );
}
export default CustomerLogin;
