const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors()); // Enable CORS

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Benjamin8991!',
    database: 'tutoring'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Route to handle registration
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, email], (err, result) => {
        if (err) {
            return res.status(500).send('Error registering user');
        }
        res.status(200).send('User registered successfully');
    });
});

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Username not found');
        }

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }

        res.status(200).send('Login successful');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
