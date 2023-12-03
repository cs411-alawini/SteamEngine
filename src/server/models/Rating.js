import db from "../db_connection.js";

// get votes from a game
export const getVotes = async (gameID) => {
  const sql_upvotes =
    "SELECT COUNT(*) AS upvotes FROM Rating WHERE GameID = ? AND Vote = 1";
  const sql_downvotes =
    "SELECT COUNT(*) AS downvotes FROM Rating WHERE GameID = ? AND Vote = -1";
  const all_votes = "SELECT * FROM Rating WHERE GameID = ?";
  try {
    const [[{ upvotes }]] = await db.execute(sql_upvotes, [gameID]);
    const [[{ downvotes }]] = await db.execute(sql_downvotes, [gameID]);
    const [all] = await db.execute(all_votes, [gameID]);
    return { overall: upvotes - downvotes, upvotes, downvotes, all };
  } catch (err) {
    throw err;
  }
};

export const add = async ({ Username, GameID, Vote }) => {
  const sql = "INSERT INTO Rating(Username, GameID, Vote) VALUES (?, ?, ?)";
  try {
    await db.execute(sql, [Username, GameID, Vote]);
    return;
  } catch (err) {
    throw err;
  }
};

export const update = async ({ Username, GameID, Vote }) => {
  const sql = "UPDATE Rating SET Vote = ? WHERE Username = ? AND GameID = ?";
  try {
    await db.execute(sql, [Vote, Username, GameID]);
    return;
  } catch (err) {
    throw err;
  }
};

export const remove = async ({ Username, GameID }) => {
  const sql = "DELETE FROM Rating WHERE Username = ? AND GameID = ?";
  try {
    await db.execute(sql, [Username, GameID]);
    return;
  } catch (err) {
    throw err;
  }
};
