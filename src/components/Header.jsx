// src/components/Header.jsx
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-area">
        <img src="/logo.png" alt="DevFriends Logo" className="logo" />
        <div className="slogan">Connect. Collaborate. Code.</div>
      </div>
    </header>
  );
};

export default Header;
