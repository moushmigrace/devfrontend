import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Requested.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Requested = () => {
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [index, setIndex] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchRequestedUsers();
  }, []);

  const fetchRequestedUsers = async () => {
    try {
      const res = await api.get("/user/requests/sent");
      setRequestedUsers(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch sent requests:", err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/profile/request/delete/${userId}`);
      const updated = requestedUsers.filter((user) => user._id !== userId);
      setRequestedUsers(updated);

      if (index >= updated.length && updated.length > 0) {
        setIndex(updated.length - 1);
      } else if (updated.length === 0) {
        setIndex(0);
      }

      setSuccessMsg("Request successfully deleted");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Failed to delete request:", err.response?.data || err.message);
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleNext = () => {
    if (index < requestedUsers.length - 1) setIndex(index + 1);
  };

  const currentUser = requestedUsers.length > 0 ? requestedUsers[index] : null;

  return (
    <>
      <Header />
      <Navbar />
      <div className="requested-container">
        <h2>Sent Requests</h2>

        {successMsg && <p className="success-message">{successMsg}</p>}

        {requestedUsers.length === 0 ? (
          <p>No requests sent yet.</p>
        ) : (
          <div className="carousel-view">
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="arrow-btn"
            >
              ⭠
            </button>

            {currentUser && (
              <div className="user-card">
                <img
                  src={currentUser.photoUrl}
                  alt="Profile"
                  className="user-photo"
                />
                <div className="user-info">
                  <h3>
                    {currentUser.firstName} {currentUser.lastName}
                  </h3>
                  <p>{currentUser.about}</p>
                </div>
                <button
                  onClick={() => handleDelete(currentUser._id)}
                  className="delete-btn"
                >
                  Delete Request
                </button>
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={index === requestedUsers.length - 1}
              className="arrow-btn"
            >
              ⭢
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Requested;
