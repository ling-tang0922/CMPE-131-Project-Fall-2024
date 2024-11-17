import React, { useState } from "react";
import WindowWrapper from "../components/WindowWrapper";
import { Input, Label, Flex, Button } from "@aws-amplify/ui-react";
import NavBar from "../components/NavBar";
import { FaUser, FaLock } from "react-icons/fa";

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`Logging in as ${username}`);
  };

  return (
    <WindowWrapper>
      <NavBar />
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
            padding: "20px",
          }}
        >
          {/* Employee Login Title */}
          <h2 style={{ textAlign: "center", color: "#388e3c", marginBottom: "20px" }}>
            Employee Login
          </h2>

          {/* Login Form */}
          <div style={{ padding: "10px" }}>
            <Flex direction="column" gap="small">
              <Label htmlFor="username">Username:</Label>
              <Input
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variation="primary"
                onClick={handleLogin}
                style={{ backgroundColor: "#4caf50" }}
              >
                Login
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};

export default EmployeeLogin;

