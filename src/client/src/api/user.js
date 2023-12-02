import axios from "axios";
import baseURL from "./index.js";

const userURL = `${baseURL}user/`;

export const getUserInfo = async (id) => await axios.get(`${userURL}${id}`);
export const loginUser = async (id, password) =>
  await axios.post(`${userURL}login/${id}`, { password });

export const getUpvotedGamesFromUser = async (id) =>
  await axios.get(`${userURL}upvoted/${id}`);
export const getPlayedGamesFromUser = async (id) =>
  await axios.get(`${userURL}played/${id}`);

export const createUser = async (payload) =>
  await axios.post(`${userURL}`, payload);

export const updateUserInfo = async (id, payload) =>
  await axios.put(`${userURL}${id}`, payload);

export const deleteUser = async (id) => await axios.delete(`${userURL}${id}`);
