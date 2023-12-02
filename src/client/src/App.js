import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import GameDetails from "./components/GameDetails";
import Home from "./components/Home";
import PageHeader from "./components/PageHeader"
import Login from "./components/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <Router>
      <div>
        <PageHeader/>
        <Routes>
          <Route path="/games/:id" element={<GameDetails />} />
          <Route
            path="/"
            element={
              <Home
                username={username} 
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setUsername={setUsername} 
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
