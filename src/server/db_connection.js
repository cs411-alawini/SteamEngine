import mysql from "mysql2/promise";

var db = await mysql.createConnection({
  host: "104.154.170.0",
  user: "root",
  password: "PREQL411*!",
  database: "preql",
});

export default db;
