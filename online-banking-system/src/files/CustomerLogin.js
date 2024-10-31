import React, { useState } from "react";
import {
  CiUser,
  CiLock,
  CiMail,
  CiSquareChevRight,
  CiSquareChevLeft,
} from "react-icons/ci";
import WindowWrapper from "../components/WindowWrapper";
import {
  Input,
  Label,
  Flex,
  Button,
  Tabs,
  Divider,
  PhoneNumberField,
} from "@aws-amplify/ui-react";
import NavBar from "../components/NavBar";

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
    <h1 style={{ textAlign: "center", marginTop: "10%", marginBottom: "0" }}>
      Get Started!
    </h1>
    <p style={{ textAlign: "center", marginTop: "0%" }}>
      Please fill out your information to get started.
    </p>
  </>
);

const CustomerLogin = () => {
  const [activeTab, setActiveTab] = useState("Login");
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
                          placeholder="Enter Username"
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
                          placeholder="Enter Password"
                          name="username"
                          style={{ paddingLeft: "35px" }}
                        />
                      </div>

                      <Button variation="primary" colorTheme="success">
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
                          <Label htmlFor="first_name">Fast Name:</Label>
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
                          name="email"
                          style={{ paddingLeft: "35px" }}
                        />
                      </div>

                      <PhoneNumberField
                        defaultDialCode="+1"
                        label="Phone number:"
                        placeholder="234-567-8910"
                        errorMessage="Enter a Valid Phone Number"
                      />
                      <Button variation="primary" colorTheme="success">
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
};
export default CustomerLogin;
