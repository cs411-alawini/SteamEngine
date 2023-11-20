import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import mysql from "mysql2/promise";
// import db from "./db_connection.js";
import gameRoutes from "./routes/game.js";
import commentsRoutes from "./routes/comments.js";
import ratingRoutes from "./routes/rating.js";
import playtimeRoutes from "./routes/playtime.js";

const app = express();
dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// default welcome page
app.get("/", (req, res) => {
  res.send("Welcome to Steam Engine!");
});

app.use("/games", gameRoutes);
app.use("/comments", commentsRoutes);
app.use("/rating", ratingRoutes);
app.use("/playtime", playtimeRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
