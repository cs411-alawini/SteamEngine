import React from "react";
import "./GameDisplay.css";
import GameCard from "./GameCard";

function GameDisplay({ games }) {
  return games.length > 0 ? (
    <div className="game-container">
      {games.map((game) => (
        <GameCard
          key={game.GameID}
          GameID={game.GameID}
          HeaderImageURL={game.HeaderImageURL}
          GameName={game.GameName}
          Description={game.Description}
          ReleaseDate={game.ReleaseDate}
          Price={game.Price}
          MetaCritic={game.MetaCritic}
        />
      ))}
    </div>
  ) : (
    <h2>No games found😔</h2>
  );
}
export default GameDisplay;
