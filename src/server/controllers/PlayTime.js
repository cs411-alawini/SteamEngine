import * as PlayTime from "../models/PlayTime.js";

export const deletePlayTime = async (req, res) => {
  const [Username, GameID] = req.params.id.split("-");
  try {
    await PlayTime.remove({ Username, GameID });
    res.status(200).json({ message: "Playtime deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updatePlayTime = async (req, res) => {
  const [Username, GameID] = req.params.id.split("-");
  const { HoursPlayed } = req.body;
  try {
    await PlayTime.update({ Username, GameID, HoursPlayed });
    res.status(200).json({ message: "Playtime updated successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPlayTime = async (req, res) => {
  const { Username, GameID, HoursPlayed } = req.body;
  try {
    await PlayTime.add({ Username, GameID, HoursPlayed });
    res.status(200).json({ message: "Playtime created successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPlayTimeFromUserAndGame = async (req, res) => {
  const [Username, GameID] = req.params.id.split("-");
  try {
    const results = await PlayTime.getPlayTime({ Username, GameID });
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTotalPlayTimeFromGame = async (req, res) => {
  try {
    const results = await PlayTime.getTotalPlayTime(req.params.id);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
