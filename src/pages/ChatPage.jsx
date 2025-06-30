import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ChatPage.css";


const ChatPage = () => {
  const { id: targetUserIdParam } = useParams();
  const [chat, setChat] = useState({ messages: [], participants: [] });
  const [message, setMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [socketReady, setSocketReady] = useState(false);
  const socketRef = useRef();

  
  // ✅ Read user info from localStorage
  const userId = localStorage.getItem("userId") || "";
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
  const targetUserId = targetUserIdParam?.toString();
  // Fetch chat and user profile
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.get(`/chat/${targetUserId}`);
        setChat(res.data);

        const profileRes = await api.get(`/user/profile/${targetUserId}`);
        console.log("👤 Target user profile response:", profileRes.data);
        setTargetUser(profileRes.data?.data || profileRes.data);
      } catch (err) {
        console.error("❌ Chat fetch failed:", err);
      }
    };

    if (targetUserId) fetchChat();
  }, [targetUserId]);

  // Setup Socket
  useEffect(() => {
    const socket = io("http://localhost:7777", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ [CHAT SOCKET] Connected:", socket.id);
      setSocketReady(true);

      socket.emit("joinChat", {
        userId,
        targetUserId,
        firstName,
      });
    });

    socket.on("messageReceived", (msg) => {
      console.log("📥 Message received:", msg);
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
      }));
    });

    socket.on("disconnect", () => {
      console.warn("❌ Socket disconnected");
      setSocketReady(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);
  const clearChat = async () => {
    try {
      await api.delete(`/chat/${targetUserId}`);
      setChat({ messages: [], participants: [userId, targetUserId] });
    } catch (err) {
      console.error("❌ Failed to clear chat:", err);
    }
  };
  
  // Send Message
  const sendMessage = () => {
    const socket = socketRef.current;
    if (!message.trim()) return;

    if (!socket || !socket.connected) {
      alert("❌ Socket not connected!");
      return;
    }

    const msgPayload = {
      userId,
      targetUserId,
      text: message,
      firstName,
      lastName,
    };

    console.log("📤 Sending message:", msgPayload);
    socket.emit("sendMessage", msgPayload);

    // Add message to UI immediately
    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, { ...msgPayload, senderId: userId }],
    }));

    setMessage("");
  };

  useEffect(() => {
    const el = document.getElementById("chat-body");
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat.messages]);

  

  return (
    <>
      <Header />
      <div className="chat-container">
        {targetUser && (
          <div className="chat-header">
            <img src={targetUser.photoUrl} alt="Profile" className="chat-profile-img" />
            <div className="chat-user-info">
              <h3>{targetUser.firstName} {targetUser.lastName}</h3>
              <p>{targetUser.email}</p>
            </div>
            <button onClick={() => alert("Redirect to payment")}>💰 Pay</button>
            <button onClick={() => window.location.href = `mailto:${targetUser.email}`}>✉️ Email</button>
          </div>
        )}

        <div id="chat-body" className="chat-body">
          {chat.messages.length === 0 ? (
            <p className="no-messages">No messages yet.</p>
          ) : (
            chat.messages.map((m, i) => (
              <div key={i} className={`message ${m.senderId === userId ? "outgoing" : "incoming"}`}>
                <p className="message-text">{m.text}</p>
              </div>
            ))
          )}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} disabled={!socketReady}>
            Send
          </button>
          <button onClick={clearChat}>🧹 Clear Chat</button>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChatPage;
