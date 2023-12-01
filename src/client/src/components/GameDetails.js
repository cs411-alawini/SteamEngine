import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getGameById} from "../api/game.js";
import "./GameDetails.css"

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
    <div className="game-page">
      <div className="game-details">
        <div className="game-name">
          <h2>{gameData.GameName}</h2>
        </div>
        <div className="game-description"><p>{gameData.Description}</p></div>
        <div className="game-info-box-wrapper">
          <img src={gameData.HeaderImageURL} alt={gameData.GameName}></img>
          <p>{"Release Date: " + (gameData.ReleaseDate ? gameData.ReleaseDate.substring(0, 10): "")}</p>
          <p>{"Platforms: " + (gameData.PlatformWindows? "Windows " : "") + (gameData.PlatformMac ? "Mac ": "")  +(gameData.PlatformLinux ? "Linux": "")}</p>
          <p>{"MetaCritic Rating: " + gameData.MetaCritic}/100</p>
          <p>{"Players: " + gameData.PlayerEstimate}</p>
          <p>{"Age Requirement: " + (gameData.RequiredAge == 0 ? "None" : gameData.RequiredAge + "+")}</p>
          <p>{"Price on Steam: $" + gameData.Price + ".00 USD"}</p>
        </div>
        
      </div>
      <div className="user-wrapper">
          <div className="vote-wrapper">
            <div className="upvote-button">Upvote</div>
            <b>User Score:<br/>+3</b>
            <div className="downvote-button">Downvote</div>
          </div>
          <div className="comment-wrapper">
            <b>Comments (3):</b>
            
            <div className="comment"><b>Username1:</b> This is a sample comment!</div>
            <div className="comment"><b>Username2:</b> This is a cool website!</div>
            <div className="comment"><b>Username3:</b> I like eating crayons!</div>
          </div>
        </div>
    </div>
    
  );
};

export default GameDetails;
