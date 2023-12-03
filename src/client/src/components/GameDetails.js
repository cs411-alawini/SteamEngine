import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../api/game.js";
import "./GameDetails.css";
import { postComment, getComments } from "../api/comments";
import { getGameRatings } from "../api/game.js";
import Vote from "./Vote.js";
import CommentSection from "./CommentSection";


const GameDetails = ({ loggedIn, username }) => {
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  const [comments, setComments] = useState([]);

  const [ratingsData, setRatingsData] = useState({ Comments: [], Usernames: [] }); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getGameById(id);
        setGameData(results.data);

        const ratingsData = await getGameRatings(id);
        console.log("ratingsData", ratingsData.data);
        setRatingsData(ratingsData.data); // Update this line
        setComments(ratingsData.data.Comments);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if (!gameData) {
    return <div>Game not found</div>;
  }

  const handleCommentSubmit = async (commentText) => {
    try {
      await postComment({
        GameID: id,
        Username: username,
        CommentText: commentText,
      });

      const updatedRatingsData = await getGameRatings(id);
      console.log("updatedRatingsData", updatedRatingsData.data);

      setRatingsData(updatedRatingsData.data);
      setComments(updatedRatingsData.data.Comments);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="game-page">
      <div className="game-details">
        <div className="game-name">
          <h2>{gameData.GameName}</h2>
        </div>
        <div className="game-description">
          <p>{gameData.Description}</p>
        </div>
        <div className="game-info-box-wrapper">
          <img src={gameData.HeaderImageURL} alt={gameData.GameName}></img>
          <p>
            {"Release Date: " +
              (gameData.ReleaseDate
                ? gameData.ReleaseDate.substring(0, 10)
                : "")}
          </p>
          <p>
            {"Platforms: " +
              (gameData.PlatformWindows ? "Windows " : "") +
              (gameData.PlatformMac ? "Mac " : "") +
              (gameData.PlatformLinux ? "Linux" : "")}
          </p>
          <p>{"MetaCritic Rating: " + gameData.MetaCritic}/100</p>
          <p>{"Players: " + gameData.PlayerEstimate}</p>
          <p>
            {"Age Requirement: " +
              (gameData.RequiredAge == 0 ? "None" : gameData.RequiredAge + "+")}
          </p>
          <p>{"Price on Steam: $" + gameData.Price + ".00 USD"}</p>
        </div>
      </div>
      <div className="user-wrapper">
        <Vote GameID={id} loggedIn={loggedIn} username={username} />
         <CommentSection
          loggedIn={loggedIn}
          comments={comments}
          ratingsData={ratingsData}
          onSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default GameDetails;
