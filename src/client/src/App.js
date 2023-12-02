// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import GameDetails from "./components/GameDetails";
import Home from "./components/Home";
import PageHeader from "./components/PageHeader"

function App() {
  return (
    <Router>
      <div>
        <PageHeader/>
        <Routes>
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
