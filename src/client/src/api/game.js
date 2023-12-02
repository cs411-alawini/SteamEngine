import axios from "axios";
import baseURL from "./index.js";

const gameURL = `${baseURL}games/`;
// get endpoints
export const getAllGames = async () => await axios.get(`${gameURL}all`);
export const getGameById = async (id) => await axios.get(`${gameURL}${id}`);
export const getGamesWithFilter = async (params) =>
  await axios.get(`${gameURL}`, { params });
export const getBestGames = async () => await axios.get(`${gameURL}best`);
export const getPopularByAgeGames = async (lower, upper) =>
  await axios.get(`${gameURL}popularbyage`, { params: { lower, upper } });
export const getGameRatings = async (id) =>
  await axios.get(`${gameURL}gameratings/${id}`);

export const postGame = async (payload) =>
  await axios.post(`${gameURL}`, payload);
export const deleteGame = async (id) => await axios.delete(`${gameURL}${id}`);
export const updateGame = async (id, payload) =>
  await axios.put(`${gameURL}${id}`, payload);
