const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "reset@4200", // 👈 change this
  database: "steel_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Connection Failed:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});


// =============================
// ➤ ADD DATA
// =============================
app.post("/add", (req, res) => {
  const { stage_name, temperature, output_tons, efficiency } = req.body;

  const sql =
    "INSERT INTO production (stage_name, temperature, output_tons, efficiency) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [stage_name, temperature, output_tons, efficiency],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error inserting data");
      }
      res.send("Data added successfully ✅");
    }
  );
});


// =============================
// ➤ GET DATA
// =============================
app.get("/data", (req, res) => {
  const sql = "SELECT * FROM production ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json(result);
  });
});


// =============================
// ➤ DELETE DATA
// =============================
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM production WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send("Deleted successfully 🗑️");
  });
});


// =============================
// ➤ UPDATE DATA
// =============================
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { stage_name, temperature, output_tons, efficiency } = req.body;

  const sql =
    "UPDATE production SET stage_name=?, temperature=?, output_tons=?, efficiency=? WHERE id=?";

  db.query(
    sql,
    [stage_name, temperature, output_tons, efficiency, id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send("Updated successfully ✏️");
    }
  );
});


// =============================
// ➤ SERVER START
// =============================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});