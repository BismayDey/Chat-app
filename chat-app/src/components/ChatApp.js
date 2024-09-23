import React, { useState, useEffect } from "react";
import { database, auth } from "../firebaseConfig";
import { ref, set, onValue } from "firebase/database";
import { signOut } from "firebase/auth";
import "../styles/chat-app.css";

const ChatApp = ({ user, username, setUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [reaction, setReaction] = useState({});

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
        reactions: {},
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

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const handleEmojiSelect = (emoji) => {
    setInput((prev) => prev + emoji);
    setEmojiPickerVisible(false);
  };

  const handleReaction = (msgId, emoji) => {
    const updatedReactions = { ...reaction, [msgId]: emoji };
    setReaction(updatedReactions);
  };

  return (
    <div className="chat-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
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
            {reaction[msg.id] && (
              <span className="reaction">{reaction[msg.id]}</span>
            )}
            <button onClick={() => handleReaction(msg.id, "👍")}>👍</button>
            <button onClick={() => handleReaction(msg.id, "❤️")}>❤️</button>
            <button onClick={() => handleReaction(msg.id, "😂")}>😂</button>
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
      <div className="emoji-container">
        {emojiPickerVisible && (
          <div className="emoji-picker">
            {["😀", "😂", "😍", "👍", "❤️"].map((emoji) => (
              <span
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="emoji"
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
        <button onClick={toggleEmojiPicker} className="emoji-button">
          😊
        </button>
      </div>
      <form onSubmit={handleSendMessage} className="input-form">
        <input
          type="text"
          id="chat-input"
          name="chat-input"
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
