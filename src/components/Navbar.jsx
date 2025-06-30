import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const nav = useNavigate();

  const btns = [
    ["accepted", "Accepted"],
    ["devfriends", "DevFriends"],
    ["requested", "Requested"],
    ["explore", "Explore"]
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/profile.png"
          className="profile-logo"
          alt="Logo"
          onClick={() => nav("/profile")}
          style={{ cursor: "pointer" }}
        />
        <span className="navbar-title">DevFriends</span>
      </div>

      <div className="navbar-right">
        {btns.map(([path, label]) => (
          <button key={path} onClick={() => nav(`/${path}`)}>
            {label}
          </button>
        ))}

        {/* 🔒 Redirect to logout handler */}
        <button className="logout-btn" onClick={() => nav("/logout")}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
