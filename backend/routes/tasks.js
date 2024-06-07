const express = require('express');
const { connectToDatabase } = require('../database');
const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
  const db = connectToDatabase();
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      db.close();
      return;
    }
    res.json({ tasks: rows });
    db.close();
  });
});

// Add a new task
router.post('/', (req, res) => {
  const { title } = req.body;
  const db = connectToDatabase();
  db.run('INSERT INTO tasks (title, completed, priority) VALUES (?, ?, ?)', [title, 0, 0], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      db.close();
      return;
    }
    res.json({ id: this.lastID });
    db.close();
  });
});

// Delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const db = connectToDatabase();
  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      db.close();
      return;
    }
    res.json({ deleted: this.changes });
    db.close();
  });
});

// Update task (completion priority, recurring)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed, priority, recurring } = req.body;
  const db = connectToDatabase();
  db.run('UPDATE tasks SET title = ?, completed = ?, priority = ?, recurring = ? WHERE id = ?', [title, completed, priority, recurring, id], function(err) {
    if (err) {
      res.status(500).send('Internal Server Error');
      db.close();
      return;
    }
    res.json({ updated: this.changes })
    db.close();
  });
});

module.exports = router;
