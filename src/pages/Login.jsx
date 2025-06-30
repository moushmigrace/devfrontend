// src/pages/Login.jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Login.css";

const Login = () => {
  const [form, setForm] = useState({ emailId: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setForm({ emailId: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      alert("Welcome " + res.data.firstName);
      clearForm(); // Clear form after successful login
      navigate("/homepage");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      clearForm(); // Also clear on failed login
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <h2>Login to DevFriends</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="emailId"
            placeholder="Enter your email"
            value={form.emailId}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
