import axios from "axios";
import baseURL from "./index.js";

const playtimeURL = `${baseURL}playtime/`;

export const getPlayTimeFromUserAndGame = async (id) =>
  await axios.get(`${playtimeURL}${id}`);
export const getTotalPlayTimeFromGame = async (id) =>
  await axios.get(`${playtimeURL}total/${id}`);

export const postPlayTime = async (payload) =>
  await axios.post(`${playtimeURL}`, payload);

export const updatePlayTime = async (id, payload) =>
  await axios.put(`${playtimeURL}${id}`, payload);

export const deletePlayTime = async (id) =>
  await axios.delete(`${playtimeURL}${id}`);
