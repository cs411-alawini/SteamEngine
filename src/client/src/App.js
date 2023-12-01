// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import GameDetails from "./components/GameDetails";
import SearchBar from "./components/SearchBar";
import SearchResults from "./SearchResults";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <header className="app-header">
          <h1>SteamEngine</h1>
        </header>
        <Routes>
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
