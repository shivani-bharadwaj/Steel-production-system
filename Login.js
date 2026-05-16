import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import sailLogo from "../sail.png";

function Login() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "admin" && username === "admin" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/dashboard");
    } 
    else if (role === "viewer" && username === "user" && password === "user123") {
      localStorage.setItem("role", "viewer");
      navigate("/dashboard");
    } 
    else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">

        {/* LOGO + SAIL */}
        <div className="login-title-row">
          <img src={sailLogo} alt="SAIL Logo" className="login-logo" />
          <h1 className="main-title">SAIL</h1>
        </div>

        <h2 className="sub-title">Steel Authority Of India Limited</h2>
        <h3 className="login-title">Steel Production Login</h3>

        {/* FORM */}
        <div className="login-box">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          <input
            type="text"
            placeholder="Username"
            className="input-field"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} className="login-btn">
            Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;