import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";

import api from "../components/api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.AuthenticateUser(username, password);
      if (res) {
        login(username, password); //set user as authenticated
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box>
      <TextField
        variant="outlined"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      >
        Username:
      </TextField>
      <TextField
        variant="outlined"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      >
        Username:
      </TextField>
      <Button onClick={handleSubmit}>Login</Button>
    </Box>
  );
};

export default Login;
