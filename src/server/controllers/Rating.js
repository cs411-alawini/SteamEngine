import * as Rating from "../models/Rating.js";

export const getVotesFromGame = async (req, res) => {
  try {
    const results = await Rating.getVotes(req.params.id);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteVote = async (req, res) => {
  const [Username, GameID] = req.params.id.split("-");
  try {
    await Rating.remove({ Username, GameID });
    res.status(200).json({ message: "Vote deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateVote = async (req, res) => {
  const [Username, GameID] = req.params.id.split("-");
  const { Vote } = req.body;
  try {
    await Rating.update({ Username, GameID, Vote });
    res.status(200).json({ message: "Vote updated successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createVote = async (req, res) => {
  const { Username, GameID, Vote } = req.body;
  try {
    await Rating.add({ Username, GameID, Vote });
    res.status(200).json({ message: "Vote created successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
