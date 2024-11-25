import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    login(); //set user as authenticated
    navigate("/home");
  };

  return (
    <div>
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
};

export default Login;
