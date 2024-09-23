// src/ChatApp.js
import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig";
import { ref, set, onValue } from "firebase/database";
import "./ChatApp.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

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
      const messagesRef = ref(database, "messages");
      const newMessageRef = ref(database, `messages/${Date.now()}`);
      await set(newMessageRef, { text: input });
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
