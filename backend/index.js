const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Insecure database credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123', // Hardcoded password
  database: 'testdb',
});

// Vulnerable route - SQL Injection
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hash the password with insecure MD5
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

  // Vulnerable query (SQL Injection)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${hashedPassword}'`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (results.length > 0) {
      res.send({ message: 'Login successful!', user: results[0] });
    } else {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  });
});

// File upload without validation
app.post('/upload', (req, res) => {
  const file = req.body.file;

  const filePath = `uploads/${Date.now()}.txt`; // No validation
  fs.writeFileSync(filePath, file);

  res.send({ message: 'File uploaded!', path: filePath });
});

// Command injection vulnerability
app.get('/exec', (req, res) => {
  const { cmd } = req.query;

  require('child_process').exec(cmd, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ output: stdout || stderr });
  });
});

// Insecure endpoint leaking sensitive data
app.get('/debug', (req, res) => {
  res.send({
    environment: process.env,
    dbCredentials: {
      user: 'root',
      password: 'password123',
    },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});