import "./App.css";
import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {Chat} from "./components/Chat";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </div>
    </Router>
  );
}
