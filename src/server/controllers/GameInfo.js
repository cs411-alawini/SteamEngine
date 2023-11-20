import * as GameInfo from "../models/GameInfo.js";

export const getGames = async (req, res) => {
  const {
    keyword,
    tags,
    minYear,
    maxYear,
    mac,
    windows,
    linux,
    minPrice,
    maxPrice,
    requiredAge,
    minMetaCritic,
    maxMetaCritic,
    sortBy,
    sortOrder,
    maxResults,
  } = req.query;
  try {
    const results = await GameInfo.get({
      keyword: keyword ? keyword.toLowerCase() : "",
      tags: tags ? tags.trim().split(",") : [],
      minYear: minYear || 0,
      maxYear: maxYear || 9999,
      mac: mac || 0,
      windows: windows || 0,
      linux: linux || 0,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 9999,
      requiredAge: requiredAge || 999,
      minMetaCritic: minMetaCritic || 0,
      maxMetaCritic: maxMetaCritic || 101,
      sortBy: sortBy || "MetaCritic",
      sortOrder: sortOrder ? sortOrder.toUpperCase() : "DESC",
      maxResults: maxResults || 200,
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const results = await GameInfo.getAll();
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const result = await GameInfo.find(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// adv query #1
export const getPopularGamesFromAgeRange = async (req, res) => {
  const { lower, upper } = req.query;
  try {
    const results = await GameInfo.getPopularGamesByAge(lower, upper);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// adv query #2
export const getBestGames = async (req, res) => {
  try {
    const results = await GameInfo.getBestGames();
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteGame = async (req, res) => {
  try {
    await GameInfo.remove(req.params.id);
    res.status(200).json({ message: "Game deleted successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateGame = async (req, res) => {
  const {
    GameName,
    Attributes,
    Description,
    ReleaseDate,
    PlatformMac,
    PlatformWindows,
    PlatformLinux,
    Price,
    RequiredAge,
    MetaCritic,
    PlayerEstimate,
    BackgroundImageURL,
    HeaderImageURL,
  } = req.body;
  try {
    await GameInfo.update(req.params.id, {
      GameName,
      Attributes,
      Description,
      ReleaseDate,
      PlatformMac,
      PlatformWindows,
      PlatformLinux,
      Price,
      RequiredAge,
      MetaCritic,
      PlayerEstimate,
      BackgroundImageURL,
      HeaderImageURL,
    });
    res.status(200).json({ message: "Game updated successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createGame = async (req, res) => {
  const {
    GameName,
    Attributes,
    Description,
    ReleaseDate,
    PlatformMac,
    PlatformWindows,
    PlatformLinux,
    Price,
    RequiredAge,
    MetaCritic,
    PlayerEstimate,
    BackgroundImageURL,
    HeaderImageURL,
  } = req.body;
  try {
    const gameID = await GameInfo.add({
      GameName,
      Attributes,
      Description,
      ReleaseDate,
      PlatformMac,
      PlatformWindows,
      PlatformLinux,
      Price,
      RequiredAge,
      MetaCritic,
      PlayerEstimate,
      BackgroundImageURL,
      HeaderImageURL,
    });
    res
      .status(200)
      .json({ newGameID: gameID, message: "Game created successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
