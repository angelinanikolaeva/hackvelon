import "./App.scss";
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Chat} from "./components/Chat";
import NavBar from "./components/Layout/NavBar";

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </div>
    </Router>
  );
}
