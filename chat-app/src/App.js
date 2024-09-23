import React, { useState } from "react";
import ChatApp from "./components/ChatApp";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      {user ? (
        <ChatApp user={user} username={username} />
      ) : showSignup ? (
        <Signup setUser={setUser} setUsername={setUsername} />
      ) : (
        <Login setUser={setUser} setUsername={setShowSignup} />
      )}
    </div>
  );
};

export default App;
