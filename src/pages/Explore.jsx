// src/pages/Explore.jsx

import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Explore.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Explore = () => {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/feed");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const sendRequest = async () => {
    const user = users[index];
    try {
      await api.post(`/request/send/${user._id}`);
      alert(`Request sent to ${user.firstName}`);
      handleNext(); // Move to next profile
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const handleNext = () => {
    if (index < users.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (users.length === 0) {
    return <div className="explore-container"><h2>No developers to show.</h2></div>;
  }

  const currentUser = users[index];

  return (
    <>
    <Header/>
    <Navbar />
    <div className="explore-container">
      <h2>Explore Developers</h2>
      <div className="profile-swipe-container">
        <button className="arrow-btn" onClick={handlePrev} disabled={index === 0}>⭠</button>

        <div className="profile-card">
          <img src={currentUser.photoUrl} alt="Profile" className="profile-img" />
          <h3>{currentUser.firstName} {currentUser.lastName}</h3>
          <p>{currentUser.about}</p>
          <p><strong>Skills:</strong> {currentUser.skills?.join(", ")}</p>
          <button className="btn-request" onClick={sendRequest}>Send Request</button>
        </div>

        <button className="arrow-btn" onClick={handleNext} disabled={index === users.length - 1}>⭢</button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Explore;
