import React, { useState } from "react";
import { CiUser, CiLock, CiMail, CiSquareChevRight } from "react-icons/ci";
import WindowWrapper from "../components/WindowWrapper";
import axios from "axios";
import {
  Input,
  Label,
  Flex,
  Button,
  Tabs,
  Divider,
  PhoneNumberField,
} from "@aws-amplify/ui-react";
import NavBar from "../components/NavBar"
import { useNavigate } from 'react-router-dom'
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
  const [phoneNumber, setPhoneNumber] = useState("")
  const [initialBalance, setBalance] = useState("")
  const [message, setMessage] = useState("")
  
  
  const handleLogin = () => {
    axios.get('http://localhost:4000/validate-credentials-userLogin', {
      params: { username: username, password: password, type: 'customer', bankID: null, bankPin: null }
    })
    
    .then(response => {
      console.log('Response received:', response.data);
      if (response.data.success) {
        const bankID = response.data.bankID;
        console.log(bankID)
        navigate('/DashBoard', { state: { bankID } });
      }
    })
    .catch(error => {
      console.error('Error occurred:', error);
      if (error.response && error.response.status === 401) {
        setMessage("Invalid credentials");
      } else {
        setMessage("Error validating credentials");
      }
    })
  }
    


  
  const handleSignUp = () => {
    
    if(!username || !password || !firstName || !lastName || !phoneNumber || !email){
      setMessage("All fields are required")
      console.log('here 1')
      return
     }
    else if(password !== confirmPassword){
      setMessage("Passwords don't match")
      console.log('here 2')
      return
    }else{
      axios.post('http://localhost:4000/app/new-account',{
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        intitialBalance: initialBalance || 0,
   })
   .then(response =>{
    if(response.data.success){
      setMessage("Account Created")

        navigate("/CustomerDashboard", axios.get('http://localhost:4000/account-ID', {params: {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        intitialBalance: initialBalance || 0
        }}))
    
    }
   })
   .catch(error =>{
    setMessage("Error creating new account")
    console.error(error)
   })
    }

  };

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

                    <Flex
                      direction="row"
                      gap="small"
                      style={{ marginTop: "3%", justifyContent: "flex-end" }}
                    >
                      <a href="/" style={{ fontSize: 15 }}>
                        Forgot Username?
                      </a>
                      <Divider size="default" orientation="vertical" />
                      <a href="/" style={{ fontSize: 15 }}>
                        Forgot Password?
                      </a>
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

                      <PhoneNumberField
                        defaultDialCode="+1"
                        label="Phone number:"
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        placeholder="234-567-8910"
                        errorMessage="Enter a Valid Phone Number"
                      />
                      <Button onClick={handleSignUp} variation="primary" colorTheme="success">
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
