import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Homepage.css";

const Homepage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="homepage-container">
        <h1>Welcome to DevFriends</h1>
        <p>Find like-minded developers, build projects together, and grow your network.</p>
        <div className="homepage-actions">
          <button onClick={() => window.location.href = "/explore"}>Explore Developers</button>
          <button onClick={() => window.location.href = "/devfriends"}>Your DevFriends</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
