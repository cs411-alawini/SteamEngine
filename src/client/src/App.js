// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import GameDetails from './GameDetails';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults'


function App() {
  const [backendData, setBackendData] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/games")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <Router>
      <div>
        <header className="app-header">
          <h1>SteamEngine</h1>
          <div>
            <SearchBar setResults ={setResults}/>
            <SearchResults results={results}/>
          </div>
          
        </header>
        <div className="game-container">
          {backendData.map((game) => (
            <div key={game.GameID} className="game-card">
              <img src={game.HeaderImageURL} alt={game.GameName} />
              <div className="game-details">
                <h2>{game.GameName}</h2>
                <p>{truncateDescription(game.Description, 220)}</p>
                {(
                  <Link to={`/games/${game.GameID}`} className="show-more-button">
                    Show more
                  </Link>
                )}
                <p>Release Date: {new Date(game.ReleaseDate).toLocaleDateString()}</p>
                <p>Price: ${game.Price}</p>
                <p>MetaCritic Score: {game.MetaCritic}</p>
              </div>
            </div>
          ))}
        </div>
        <Routes>
          <Route
            path="/games/:id"
            element={<GameDetails backendData={backendData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;