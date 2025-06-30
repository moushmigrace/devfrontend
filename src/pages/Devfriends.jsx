// src/pages/DevFriends.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/DevFriends.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const DevFriends = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  const fetchFriends = async () => {
    try {
      const res = await api.get("/user/devfriends");
      setFriends(res.data.data || []);
    } catch (err) {
      console.error("Failed to load devfriends:", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <div className="devfriends-container">
        <h2>Your DevFriends</h2>
        {friends.length === 0 && <p>No DevFriends yet.</p>}
        <div className="chat-list">
          {friends.map((user) => (
            <div
              key={user._id}
              className="chat-list-item"
              onClick={() => navigate(`/chat/${user._id}`)}
            >
              <img src={user.photoUrl} alt="avatar" className="avatar" />
              <div className="chat-info">
                <h3>{user.firstName} {user.lastName}</h3>
                <p className="last-message">Tap to chat</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DevFriends;
