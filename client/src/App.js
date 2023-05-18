import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/home";
import Chat from "./pages/chat";

const socket = io.connect("http://localhost:4000"); // connect with server port 4000

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <Chat username={username} room={room} socket={socket} />
            }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
