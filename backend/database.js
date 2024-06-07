const sqlite3 = require('sqlite3').verbose();
//const dotenv = require('dotenv');

//dotenv.config();

// process.env.DATABASE_URL
// usually I'd use .env for storing it but it's a local sqlite db so we'll just connect it like this ;)

function connectToDatabase() {
  return new sqlite3.Database("./db/tasks.db", (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      return;
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
      priority BOOLEAN NOT NULL DEFAULT 0,
      recurring BOOLEAN NOT NULL DEFAULT 0
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
