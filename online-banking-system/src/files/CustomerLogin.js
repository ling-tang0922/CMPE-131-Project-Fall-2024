import React from "react";
import WindowWrappper from "../components/WindowWrapper";
import { Input, Label, Flex, Button,ScrollView } from '@aws-amplify/ui-react';
import NavBar from "../components/NavBar";
const CustomerLogin = () =>{

    return(<WindowWrappper >
        <div style={{height:"100%"

}}>
            <NavBar></NavBar>
            <div style={{display:"flex",height:"100%"}}>
                <div style={{"flex":1,height:"100%",backgroundColor:"beige"}}>
                <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px",fontSize:'3em',fontFamily:"Roboto"}}><strong>Online Banking System</strong></div>
                    <ScrollView autoScroll="smooth">
                    <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px"}}></div>
                    <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px"}}></div>
                    <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px"}}></div>
                    <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px"}}></div>
                    <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px"}}></div>
                    <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px"}}></div>
                    <div style={{minHeight:"200px",backgroundColor:"white",margin:"10px"}}></div>
                    </ScrollView>
                    

                </div>
                <div style={{"flex":1,height:"100%",}}>

                    <div style={{"margin":"20%",minWidth:"400px",backgroundColor:"white",boxShadow: "0 0 5px rgba(76, 175, 80, 0.5)"}}>
                        <div style={{ display: "flex", minHeight: "50px", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ flex: 1,border:"solid purple", borderWidth:"2px 0 0 0",padding: "10px", textAlign: "center" }}>
                                <strong>Login</strong>
                            </div>
                            <div style={{ flex: 1,padding: "10px", textAlign: "center" }}>
                            <strong>Sign Up</strong>
                            </div>
                            
                        </div>
                        <div  style={{"padding":"10px"}}>
                            <Flex direction="column" gap="small">
                                <Label htmlFor="first_name">Username:</Label>
                                <Input placeholder="Enter Username" name="username" />
                                <Label htmlFor="first_name">Password:</Label>
                                <Input type="password" placeholder="Enter Password" name="username" />
                                <Button variation="primary" colorTheme="success">Login</Button>
                            </Flex>          
                            <a style={{"color":"blue",display:"flex",justifyContent:"end",margin:"10px 0",fontSize:"small"}} href="#">Forgot Password?</a>
                        </div>
                    </div>
                        
                </div>
            </div>
        </div></WindowWrappper>)
}
export default CustomerLogin;