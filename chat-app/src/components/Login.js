import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/chat-app.css";

const Login = ({ setUser, setUsername }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Chat App</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="login-email"
          name="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="input"
        />
        <input
          type="password"
          id="login-password"
          name="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input"
        />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <p onClick={() => setUsername(true)} className="toggle">
        Don't have an account? Sign Up
      </p>
    </div>
  );
};

export default Login;
