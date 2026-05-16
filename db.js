const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "reset@4200", // put your MySQL password here
  database: "steel_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB error ❌", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;