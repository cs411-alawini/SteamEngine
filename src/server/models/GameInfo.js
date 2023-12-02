import db from "../db_connection.js";

export const retrieveGameRatings = async (id) => {
  const sql = "CALL RetrieveGameRatings(?)";
  try {
    const [result] = await db.execute(sql, [id]);
    // const comments = result[1];
    const [total_ratings] = result[0];
    return total_ratings;
  } catch (err) {
    throw err;
  }
};

// get games that match search criteria
export const get = async ({
  keyword,
  tags,
  minYear,
  maxYear,
  mac,
  windows,
  linux,
  minPrice,
  maxPrice,
  requiredAge,
  minMetaCritic,
  maxMetaCritic,
  sortBy,
  sortOrder,
  maxResults,
}) => {
  let sql = "SELECT * FROM GameInfo ";
  sql += `WHERE (LOWER(GameName) LIKE \"%${keyword}%\" OR LOWER(Description) LIKE \"%${keyword}%\") `;
  if (tags.length > 0) {
    sql += "AND (";
    for (let i = 0; i < tags.length; i++) {
      sql += `Attributes LIKE \"%${tags[i].trim()}%\" `;
      if (i < tags.length - 1) {
        sql += "AND ";
      }
    }
    sql += ") ";
  }
  sql += `AND (EXTRACT(YEAR FROM ReleaseDate) >= ${minYear} AND EXTRACT(YEAR FROM ReleaseDate) <= ${maxYear}) `;
  if (mac || windows || linux) {
    sql += "AND (";
    if (mac) {
      sql += "PlatformMac = 1 ";
    }
    if (windows) {
      if (mac) sql += "OR ";
      sql += "PlatformWindows = 1 ";
    }
    if (linux) {
      if (mac || windows) sql += "OR ";
      sql += "PlatformLinux = 1 ";
    }
    sql += ") ";
  }
  sql += `AND (Price >= ${minPrice} AND Price <= ${maxPrice}) `;
  sql += `AND (RequiredAge <= ${requiredAge}) `;
  sql += `AND (MetaCritic >= ${minMetaCritic} AND MetaCritic <= ${maxMetaCritic}) `;
  sql += `ORDER BY ${sortBy} ${sortOrder} LIMIT ${maxResults}`;
  // console.log(sql);

  try {
    const [rows] = await db.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

// get all games
export const getAll = async () => {
  const sql = "SELECT * FROM GameInfo";
  try {
    const [rows] = await db.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

// get game by id
export const find = async (id) => {
  const sql = "SELECT * FROM GameInfo WHERE GameID = ?";
  try {
    const [[row]] = await db.execute(sql, [id]);
    return row;
  } catch (err) {
    throw err;
  }
};

// ADV QUERY 1: get popular games in age range
export const getPopularGamesByAge = async (lowerAge, upperAge) => {
  const sql = `
    SELECT GameID, GameName, SUM(HoursPlayed) as totalHours
    FROM PlayTime NATURAL JOIN GameInfo NATURAL JOIN UserProfile
    WHERE Age > ? AND AGE < ?
    GROUP BY GameID, GameName
    ORDER BY totalHours DESC, GameName ASC`;
  try {
    const [rows] = await db.execute(sql, [lowerAge, upperAge]);
    return rows;
  } catch (err) {
    throw err;
  }
};

// ADV QUERY 2: get best games(top rated and popularity)
export const getBestGames = async () => {
  const sql =
    "SELECT g.GameID, g.GameName, g.PlayerEstimate, g.Metacritic, g.ReleaseDate FROM GameInfo g JOIN ((SELECT GameID FROM GameInfo WHERE EXTRACT(YEAR FROM ReleaseDate) >= 2000 ORDER BY PlayerEstimate DESC LIMIT 100) INTERSECT (SELECT GameID FROM GameInfo ORDER BY Metacritic DESC LIMIT 100)) as BestGames ON BestGames.GameID = g.GameID ORDER BY PlayerEstimate DESC, Metacritic DESC, ReleaseDate DESC, GameName ASC";
  try {
    const [rows] = await db.execute(sql);
    return rows;
  } catch (err) {
    throw err;
  }
};

export const remove = async (id) => {
  const sql = "DELETE FROM GameInfo WHERE GameID = ?";
  try {
    await db.execute(sql, [id]);
    return;
  } catch (err) {
    throw err;
  }
};

export const update = async (
  id,
  {
    GameName,
    Attributes,
    Description,
    ReleaseDate,
    PlatformMac,
    PlatformWindows,
    PlatformLinux,
    Price,
    RequiredAge,
    MetaCritic,
    PlayerEstimate,
    BackgroundImageURL,
    HeaderImageURL,
  },
) => {
  const sql = `UPDATE GameInfo SET GameName = ?, Attributes = ?, Description = ?, ReleaseDate = ?, PlatformMac = ?, PlatformWindows = ?, PlatformLinux = ?, Price = ?, RequiredAge = ?, MetaCritic = ?, PlayerEstimate = ?, BackgroundImageURL = ?, HeaderImageURL = ? WHERE GameID = ?`;
  try {
    await db.execute(sql, [
      GameName,
      Attributes,
      Description,
      ReleaseDate,
      PlatformMac,
      PlatformWindows,
      PlatformLinux,
      Price,
      RequiredAge,
      MetaCritic,
      PlayerEstimate,
      BackgroundImageURL,
      HeaderImageURL,
      id,
    ]);
    return;
  } catch (err) {
    throw err;
  }
};

export const add = async ({
  GameName,
  Attributes,
  Description,
  ReleaseDate,
  PlatformMac,
  PlatformWindows,
  PlatformLinux,
  Price,
  RequiredAge,
  MetaCritic,
  PlayerEstimate,
  BackgroundImageURL,
  HeaderImageURL,
}) => {
  const sql = "SELECT MAX(GameID)+1 as newGameID FROM GameInfo";
  const sql2 = `INSERT INTO GameInfo(GameID, GameName, Attributes, Description, ReleaseDate, PlatformMac, PlatformWindows, PlatformLinux, Price, RequiredAge, MetaCritic, PlayerEstimate, BackgroundImageURL, HeaderImageURL) VALUES(?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const [[{ newGameID }]] = await db.execute(sql);
    await db.execute(sql2, [
      newGameID,
      GameName,
      Attributes,
      Description,
      ReleaseDate,
      PlatformMac,
      PlatformWindows,
      PlatformLinux,
      Price,
      RequiredAge,
      MetaCritic,
      PlayerEstimate,
      BackgroundImageURL,
      HeaderImageURL,
    ]);
    return newGameID;
  } catch (err) {
    throw err;
  }
};
