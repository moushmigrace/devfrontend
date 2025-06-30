import React from "react"; // ✅ Required for JSX
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Getstarted from "./pages/Getstarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import Requested from "./pages/requested";
import Accepted from "./pages/accepted";
import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import DevFriends from "./pages/Devfriends";
import Profile from "./pages/Profile";
import "./index.css";
import Logout from "./pages/Logout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Getstarted />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/requested" element={<Requested />} />
        <Route path="/accepted" element={<Accepted />} />
        <Route path="/devfriends" element={<DevFriends />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </BrowserRouter>
  );
}
