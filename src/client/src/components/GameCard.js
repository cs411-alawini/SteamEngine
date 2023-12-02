import React from "react";
import "./GameDisplay.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function GameCard({
  GameID,
  HeaderImageURL,
  GameName,
  Description,
  ReleaseDate,
  Price,
  MetaCritic,
}) {
  const truncateDescription = (description, maxLength) => {
    if (description && description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <div className="game-card">
      <img src={HeaderImageURL} alt={GameName} />
      <div className="game-details">
        <h2>{GameName}</h2>
        <p>{truncateDescription(Description, 220)}</p>
        {
          <Link to={`/games/${GameID}`} className="show-more-button">
            Show more
          </Link>
        }
        <p>Release Date: {new Date(ReleaseDate).toLocaleDateString()}</p>
        <p>Price: ${Price}</p>
        <p>MetaCritic Score: {MetaCritic}</p>
      </div>
    </div>
  );
}
export default GameCard;
