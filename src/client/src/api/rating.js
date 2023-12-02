import axios from "axios";
import baseURL from "./index.js";

const ratingURL = `${baseURL}rating/`;

export const getVotes = async (id) => await axios.get(`${ratingURL}${id}`);
export const postVote = async (payload) =>
  await axios.post(`${ratingURL}`, payload);
export const updateVote = async (id, payload) =>
  await axios.put(`${ratingURL}${id}`, payload);
export const deleteVote = async (id) => await axios.delete(`${ratingURL}${id}`);
