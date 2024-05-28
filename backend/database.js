const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

dotenv.config();

function connectToDatabase() {
  return new sqlite3.Database(process.env.DATABASE_URL, (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });
}

function initializeDatabase() {
  const db = connectToDatabase();
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0,
      priority BOOLEAN NOT NULL DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table', err);
    }
    db.close();
  });
}

initializeDatabase();

module.exports = { connectToDatabase };
