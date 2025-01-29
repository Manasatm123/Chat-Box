import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import url from "../assets/url";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import logo from "../assets/photo.jpeg"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      pass: password,
    };

    try {
      const response = await axios.post(`${url}/login`, loginData);
      if (response.status === 201) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome Back</h2>
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
          >
            Login
          </Button>
          <div className="links">
            <a href="/pverify" className="link">
              Forgot Password?
            </a>
            <a href="/verify" className="link">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
