import "./App.scss";
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Chat} from "./components/Chat";
import NavBar from "./components/Layout/NavBar";
import Content from "./components/Layout/Content";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Content>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </Content>
    </Router>
  );
}
