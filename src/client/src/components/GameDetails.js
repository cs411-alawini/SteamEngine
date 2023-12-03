import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../api/game.js";
import "./GameDetails.css";
import CommentForm from "./CommentForm";
import { postComment, getComments, deleteComment } from "../api/comments";
import Vote from "./Vote.js";

const GameDetails = ({ loggedIn, username }) => {
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getGameById(id);
        setGameData(results.data);

        const commentsData = await getComments(id);
        setComments(commentsData.data);
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

      const commentsData = await getComments(id);
      setComments(commentsData.data);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      console.log("commentId: ", commentId);
      await deleteComment(commentId);
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
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
        <div className="comment-wrapper">
          <b>Comments ({comments.length}):</b>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <b>{comment.Username}:</b> {comment.CommentText}
              {loggedIn && comment.Username === username && (
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
              )}
            </div>
          ))}
          {loggedIn && <CommentForm onSubmit={handleCommentSubmit} />}
        </div>
        
      </div>
      
    </div>
  );
};

export default GameDetails;
