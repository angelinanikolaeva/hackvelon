import "./App.scss";
import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {Chat} from "./components/Chat";
// import NavBar from "./components/Layout/NavBar";
import Content from "./components/Layout/Content";
import HomePage from "./components/HomePage/HomePage";
import BotsList from "./components/HomePage/BotsList";

export default function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Content>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/bots" element={<BotsList />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Content>
    </Router>
  );
}
