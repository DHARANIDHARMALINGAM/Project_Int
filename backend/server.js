const express = require('express');
const cors = require('cors');
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//Get method
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//Post method
app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'name, email, and age are required' });
  }
  db.query(
    'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
    [name, email, age],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User created', id: result.insertId });
    }
  );
});

//Put method
app.put('/api/users/:id', (req, res) => {
  const { name, email, age } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
    [name, email, age, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User updated' });
    }
  );
});

//patch methosd
app.patch('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body).map(key => `${key} = ?`).join(', ');
  const values = Object.values(req.body);
  if (!fields.length) return res.status(400).json({ error: 'No fields to update' });
  db.query(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User partially updated' });
  });
});

//delete method
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
