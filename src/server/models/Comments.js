import db from "../db_connection.js";

// get comments from a game
export const get = async (gameID) => {
  const sql = "SELECT * FROM Comments WHERE GameID = ?";
  try {
    const [rows] = await db.execute(sql, [gameID]);
    return rows;
  } catch (err) {
    throw err;
  }
};

// delete comment
export const remove = async (commentID) => {
  const sql = "DELETE FROM Comments WHERE CommentID = ?";
  try {
    await db.execute(sql, [commentID]);
    return;
  } catch (err) {
    throw err;
  }
};

export const update = async (commentID, { GameID, Username, CommentText }) => {
  const sql = `UPDATE Comments SET GameID = ?, Username = ?, CommentText = ? WHERE CommentID = ?`;
  try {
    await db.execute(sql, [GameID, Username, CommentText, commentID]);
    return;
  } catch (err) {
    throw err;
  }
};

export const add = async ({ GameID, Username, CommentText }) => {
  const sql = "SELECT MAX(CommentID)+1 AS newCommentID FROM Comments";
  const sql2 =
    "INSERT INTO Comments(CommentID, GameID, Username, CommentText) VALUES (?, ?, ?, ?)";
  try {
    const [[{ newCommentID }]] = await db.execute(sql);
    await db.execute(sql2, [newCommentID, GameID, Username, CommentText]);
    return newCommentID;
  } catch (err) {
    throw err;
  }
};
