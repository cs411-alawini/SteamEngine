import * as UserProfile from "../models/UserProfile.js";

export const getUserInfo = async (req, res) => {
  const username = req.params.id;
  const { password } = req.query;
  try {
    const result = await UserProfile.get(username, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  const {
    Username,
    Password,
    Age,
    OwnsMac,
    OwnsLinux,
    OwnsWindows,
    FavoriteGenres,
  } = req.body;

  if (Username.includes("-")) {
    res.status(400).json({ message: "Username cannot contain -" });
    return;
  }
  try {
    await UserProfile.create({
      Username,
      Password,
      Age,
      OwnsMac,
      OwnsLinux,
      OwnsWindows,
      FavoriteGenres,
    });
    res.status(201).json({ message: `User: ${Username} created` });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUserInfo = async (req, res) => {
  const username = req.params.id;
  const { Age, OwnsMac, OwnsLinux, OwnsWindows, FavoriteGenres } = req.body;
  try {
    await UserProfile.update(username, {
      Age,
      OwnsMac,
      OwnsLinux,
      OwnsWindows,
      FavoriteGenres,
    });
    res.status(200).json({ message: `User: ${username} updated successfully` });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const username = req.params.id;
  try {
    await UserProfile.remove(username);
    res.status(200).json({ message: `User: ${username} deleted successfully` });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUpvotedGames = async (req, res) => {
  const username = req.params.id;
  try {
    const result = await UserProfile.getUpvotedGames(username);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPlayedGames = async (req, res) => {
  const username = req.params.id;
  try {
    const result = await UserProfile.getPlayedGames(username);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
