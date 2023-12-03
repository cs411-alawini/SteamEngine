import React, { useEffect, useState } from "react";
import { getVotes, postVote, updateVote, deleteVote } from "../api/rating.js";
import { getGameRatings } from "../api/game.js";
import "./GameDetails.css";
import { Button } from "@mui/material";

function Vote({ GameID, loggedIn, username }) {
  const [voteScore, setVoteScore] = useState(0);
  const [userVote, setUserVote] = useState(0);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const results = await getVotes(GameID);
      console.log("results", results);
      const rating_results = await getGameRatings(GameID);
      setVoteScore(rating_results.data.AverageRating);
      if (loggedIn) {
        const userVote = results.data.all.find(
          (vote) => vote.Username === username
        );
        console.log("userVote", userVote);
        if (userVote) {
          setUserVote(userVote.Vote);
        } else {
          setUserVote(0);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpvote = async () => {
    if (!loggedIn) {
      alert("You must be logged in to vote.");
      return;
    }
    try {
      if (userVote === 0) {
        await postVote({ Username: username, GameID: GameID, Vote: 1 });
      } else if (userVote === -1) {
        await updateVote(`${username}-${GameID}`, { Vote: 1 });
      } else if (userVote === 1) {
        await deleteVote(`${username}-${GameID}`);
      }
      await fetchVotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownvote = async () => {
    if (!loggedIn) {
      alert("You must be logged in to vote.");
      return;
    }
    try {
      if (userVote === 0) {
        await postVote({ Username: username, GameID: GameID, Vote: -1 });
      } else if (userVote === 1) {
        await updateVote(`${username}-${GameID}`, { Vote: -1 });
      } else if (userVote === -1) {
        await deleteVote(`${username}-${GameID}`);
      }
      await fetchVotes();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="vote-wrapper">
      <Button
        variant={userVote === 1 ? "contained" : "outlined"}
        color="success"
        onClick={handleUpvote}
      >
        Upvote
      </Button>
      <br />
      <b>
        Overall Score:
        <br />
        {voteScore}
      </b>
      <br />
      <Button
        variant={userVote === -1 ? "contained" : "outlined"}
        color="error"
        onClick={handleDownvote}
      >
        Downvote
      </Button>
    </div>
  );
}

export default Vote;
