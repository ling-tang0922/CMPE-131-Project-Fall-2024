import React from "react";
import WindowWrappper from "../components/WindowWrapper";
import {
  Input,
  Label,
  Flex,
  Button,
  Tabs,
} from "@aws-amplify/ui-react";
import NavBar from "../components/NavBar";
const EmployeeLogin = () => {
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
                      <Input placeholder="Enter Username" name="username" />
                      <Label htmlFor="first_name">Password:</Label>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        name="username"
                      />
                      <Button variation="primary" colorTheme="success">
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
