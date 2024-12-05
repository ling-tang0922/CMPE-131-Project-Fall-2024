import React, {useState} from "react";
import WindowWrappper from "../components/WindowWrapper";
import axios from "axios";
import {
  Input,
  Label,
  Flex,
  Button,
  Tabs,
} from "@aws-amplify/ui-react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const navigate = useNavigate()
  // Backend: 
  const handleLogin = () =>{
    axios.get('http://localhost:4000/validate-credentials-userLogin',{
      params: {username: username, password: password}
    })
    .then(response=>{
      if(response.data.success){
        if(response.data.role !== 'employee' || response.data.role === 'manager'){
          alert("Invalid credentials")
          return
        }
        else{
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
          navigate('/EmployeeDashboard')
        }
      }
    })
    .catch(error=>{
      if(error.response && error.response.status === 401){
        alert("Invalid credentials")
      }else{
        alert("Error validating credentials")
      }
    })
  }
  //
  return (
    <WindowWrappper>
      <NavBar></NavBar>

      <div style={{ flex: 1, backgroundColor: "white" }}>
        <div
          style={{
            margin: "10%",
            marginTop: "12%",
            minWidth: "250px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(76, 175, 80, 0.5)",
            borderRadius: "10px",
            justifyContent: "center",
            marginRight: "30%",
            marginLeft: "30%",
          }}
        >
          <Tabs
            spacing="equal"
            justifyContent="flex-start"
            indicatorPosition="top"
            defaultValue="Login"
            items={[
              {
                label: "Login",
                value: "Login",
                content: (
                  <div style={{ padding: "10px" }}>
                    <Flex direction="column" gap="small">
                      <Label htmlFor="first_name">Username:</Label>
                      <Input 
                      placeholder="Enter Username" 
                      name="username"
                      value = {username}
                      onChange={(e)=> setUsername(e.target.value)}
                      />
                      <Label htmlFor="first_name">Password:</Label>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        name="username"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                      />
                      <Button onClick={handleLogin} variation="primary" colorTheme="success">
                        Login
                      </Button>
                    </Flex>
                    
                  </div>
                ),
              },
              
            ]}
          />
        </div>
      </div>
    </WindowWrappper>
  );
};
export default EmployeeLogin;
