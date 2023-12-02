import db from "../db_connection.js";

// login
export const login = async (username, password) => {
  const sql = `SELECT Password FROM UserProfile WHERE Username = ?`;
  try {
    const [[row]] = await db.execute(sql, [username]);
    if (row.Password === password) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

// get user info
export const get = async (username) => {
  const sql = `SELECT * FROM UserProfile WHERE Username = ?`;
  try {
    const [[row]] = await db.execute(sql, [username]);
    return row;
  } catch (err) {
    throw err;
  }
};

// create new user
export const create = async ({
  Username,
  Password,
  Age,
  OwnsMac,
  OwnsLinux,
  OwnsWindows,
  FavoriteGenres,
}) => {
  const sql =
    "INSERT INTO UserProfile (Username, Password, Age, OwnsMac, OwnsLinux, OwnsWindows, FavoriteGenres) VALUES (?, ?, ?, ?, ?, ?, ?)";
  try {
    await db.execute(sql, [
      Username,
      Password,
      Age,
      OwnsMac,
      OwnsLinux,
      OwnsWindows,
      FavoriteGenres,
    ]);
    return;
  } catch (err) {
    throw err;
  }
};

// update user info
export const update = async (
  username,
  { Age, OwnsMac, OwnsLinux, OwnsWindows, FavoriteGenres }
) => {
  const sql = `UPDATE UserProfile SET Age = ?, OwnsMac = ?, OwnsLinux = ?, OwnsWindows = ?, FavoriteGenres = ? WHERE Username = ?`;
  try {
    await db.execute(sql, [
      Age,
      OwnsMac,
      OwnsLinux,
      OwnsWindows,
      FavoriteGenres,
      username,
    ]);
    return;
  } catch (err) {
    throw err;
  }
};

// delete user
export const remove = async (username) => {
  const sql = `DELETE FROM UserProfile WHERE Username = ?`;
  try {
    await db.execute(sql, [username]);
    return;
  } catch (err) {
    throw err;
  }
};

// get upvoted games for user
export const getUpvotedGames = async (username) => {
  const sql = `SELECT * FROM (SELECT * FROM Rating WHERE Username = ? AND Vote = 1) AS R NATURAL JOIN GameInfo`;
  try {
    const [rows] = await db.execute(sql, [username]);
    return rows;
  } catch (err) {
    throw err;
  }
};

// get played games for user
export const getPlayedGames = async (username) => {
  const sql = `SELECT * FROM (SELECT * FROM PlayTime WHERE Username = ?) AS P NATURAL JOIN GameInfo`;
  try {
    const [rows] = await db.execute(sql, [username]);
    return rows;
  } catch (err) {
    throw err;
  }
};
