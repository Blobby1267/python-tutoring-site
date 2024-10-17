const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
    origin: 'https://blobby1267.github.io', // Allow your GitHub Pages site
    methods: ['POST'],
    credentials: true,
}));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_db_user',
    password: 'your_db_password',
    database: 'tutoring'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if username exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if (error) {
            return res.status(500).send('Internal server error');
        }
        if (results.length === 0) {
            return res.status(400).send('Invalid username or password');
        }

        const user = results[0];

        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('Invalid username or password');
        }

        res.send('Login successful');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
