import mysql from "mysql";

var db = mysql.createConnection({
  host: "104.154.170.0",
  user: "root",
  password: "PREQL411*!",
  database: "preql",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL Server: " + err);
    throw err;
  }
  console.log("Connected to MySQL Server!");
});

export default db;
