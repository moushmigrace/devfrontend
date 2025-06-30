// src/pages/Accepted.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Accepted.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Accepted = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/user/requests/received");
      setIncomingRequests(res.data.data || []);
    } catch (err) {
      console.error("Error fetching incoming requests:", err);
    }
  };

  const handleAccept = async (userId) => {
    try {
      await api.patch(`/request/accept/${userId}`);
      setIncomingRequests(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleIgnore = async (userId) => {
    try {
      await api.delete(`/request/delete/${userId}`);
      setIncomingRequests(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      console.error("Error ignoring request:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <div className="accepted-container">
        <h2>Incoming Requests</h2>
        {incomingRequests.length === 0 ? (
          <p>No incoming requests.</p>
        ) : (
          <div className="request-list">
            {incomingRequests.map((user) => (
              <div key={user._id} className="request-card">
                <img src={user.photoUrl} alt="Profile" className="user-photo" />
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.about}</p>
                <div className="actions">
                  <button className="accept-btn" onClick={() => handleAccept(user._id)}>Accept</button>
                  <button className="ignore-btn" onClick={() => handleIgnore(user._id)}>Ignore</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Accepted;
