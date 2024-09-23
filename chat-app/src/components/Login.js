import React from "react";
import { auth } from "../firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import "../styles/chat-app.css";

const Login = ({ setUser, setUsername }) => {
  const handleLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Chat App</h2>
      <button onClick={handleLogin} className="login-button">
        Login as Guest
      </button>
      <p>or</p>
      <button onClick={() => setUsername(true)} className="login-button">
        Sign Up
      </button>
    </div>
  );
};

export default Login;
