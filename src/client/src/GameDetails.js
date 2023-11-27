import React from 'react';

const GameDetails = ({ match, backendData }) => {
  if (!match || !match.params || !match.params.id) {
    return <div>Invalid URL</div>;
  }

  const gameId = parseInt(match.params.id);
  const game = backendData.find((game) => game.GameID === gameId);

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <h2>{game.GameName}</h2>
      <p>{game.Description}</p>
      {/* Display other details as needed */}
    </div>
  );
};

export default GameDetails;