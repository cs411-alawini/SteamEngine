import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getGameById} from "../api/game.js";

const GameDetails = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getGameById(id);
        console.log("results", results);
        setGameData(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log("id", id);

  // const game = backendData.find((game) => game.GameID === parseInt(id));

  // console.log("game", game);

  if (!gameData) {
    return <div>Game not found</div>;
  }

  console.log("gameData", gameData)

  return (
    <div>
      <div>
        </div>
        <h2>{gameData.GameName}</h2>
        <p>{gameData.Description}</p>
        {/* Display other details as needed */}
    </div>
  );
};

export default GameDetails;
