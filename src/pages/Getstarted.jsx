// src/pages/GetStarted.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/getstarted.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GetStarted = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowOptions(true);
  };

  return (
    <>
      <Header />
      <div className="getstarted-container">
        <h1 className="title">Welcome to DevFriends</h1>
        <p className="description">
          DevFriends is a platform where you can explore and connect with developer friends and collaborate on your dream projects.
        </p>

        {!showOptions ? (
          <button className="getstarted-button" onClick={handleGetStarted}>
            Get Started
          </button>
        ) : (
          <div className="auth-buttons">
            <button className="login-button" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="signup-button" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GetStarted;
