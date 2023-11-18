import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql2 from "mysql2";
import db from "./db_connection.js";

const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// default welcome page
app.get("/", (req, res) => {
  res.send("Welcome to Steam Engine!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
