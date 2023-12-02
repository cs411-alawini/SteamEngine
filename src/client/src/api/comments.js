import axios from "axios";
import baseURL from "./index.js";

const commentURL = `${baseURL}comments/`;

export const getComments = async (id) => await axios.get(`${commentURL}${id}`);
export const postComment = async (payload) =>
  await axios.post(`${commentURL}`, payload);
export const deleteComment = async (id) =>
  await axios.delete(`${commentURL}${id}`);
export const updateComment = async (id, payload) =>
  await axios.put(`${commentURL}${id}`, payload);
