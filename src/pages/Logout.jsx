import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Axios instance with credentials

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Optional: Call backend logout endpoint
        await api.post("/logout"); // Backend should clear cookies/sessions

        console.log("✅ User logged out from backend");
      } catch (err) {
        console.warn("⚠️ Backend logout failed or not configured:", err.message);
      }

      // Clear local storage
      localStorage.clear();
      console.log("🧹 Cleared localStorage");

      // Redirect to login
      navigate("/  ");
    };

    logoutUser();
  }, [navigate]);

  return null; // Or show a spinner/loading state
};

export default Logout;
