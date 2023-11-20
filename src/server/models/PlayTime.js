import db from "../db_connection.js";

export const remove = async ({ Username, GameID }) => {
  const sql = "DELETE FROM PlayTime WHERE Username = ? AND GameID = ?";
  try {
    await db.execute(sql, [Username, GameID]);
    return;
  } catch (err) {
    throw err;
  }
};

export const update = async ({ Username, GameID, HoursPlayed }) => {
  const sql =
    "UPDATE PlayTime SET HoursPlayed = ? WHERE Username = ? AND GameID = ?";
  try {
    await db.execute(sql, [HoursPlayed, Username, GameID]);
    return;
  } catch (err) {
    throw err;
  }
};

export const add = async ({ Username, GameID, HoursPlayed }) => {
  const sql =
    "INSERT INTO PlayTime(Username, GameID, HoursPlayed) VALUES (?, ?, ?)";
  try {
    await db.execute(sql, [Username, GameID, HoursPlayed]);
    return;
  } catch (err) {
    throw err;
  }
};

// get total playtime from a game and user
export const getPlayTime = async ({ Username, GameID }) => {
  const sql = "SELECT * FROM PlayTime WHERE Username = ? AND GameID = ?";
  try {
    const [[result]] = await db.execute(sql, [Username, GameID]);
    return result;
  } catch (err) {
    throw err;
  }
};

// get total playtime for a game
export const getTotalPlayTime = async (gameID) => {
  const sql =
    "SELECT SUM(HoursPlayed) AS totalHoursPlayed FROM PlayTime WHERE GameID = ?";
  try {
    const [[result]] = await db.execute(sql, [gameID]);
    return result;
  } catch (err) {
    throw err;
  }
};
