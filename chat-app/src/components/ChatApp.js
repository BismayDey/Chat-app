import React, { useState, useEffect } from "react";
import { database } from "../firebaseConfig";
import { ref, set, onValue } from "firebase/database";
import "../styles/chat-app.css";

const ChatApp = ({ user, username }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const msgArray = data
        ? Object.entries(data).map(([id, message]) => ({ id, ...message }))
        : [];
      setMessages(msgArray);
    });
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessageRef = ref(database, `messages/${Date.now()}`);
      await set(newMessageRef, {
        text: input,
        username: username,
        timestamp: Date.now(),
      });
      setInput("");
      setIsTyping(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.username === username ? "user" : "other"
            }`}
          >
            <strong>{msg.username}</strong>: {msg.text}
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      {isTyping && (
        <div className="typing-indicator">
          <span>User is typing</span>
          <div className="dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
