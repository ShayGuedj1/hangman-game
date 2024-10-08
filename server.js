const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// PostgreSQL setup
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
});

// Redis setup
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD
});

app.use(bodyParser.json());
app.use(express.static('public'));

// Create the words table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS words (
        id SERIAL PRIMARY KEY,
        word VARCHAR(255) NOT NULL
    );
`).catch(err => console.error('Error creating table:', err));

app.post('/save-word', async (req, res) => {
    const { word } = req.body;
    try {
        await pool.query('INSERT INTO words (word) VALUES ($1)', [word]);
        res.status(200).send('Word saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving word');
    }
});

app.get('/used-words', async (req, res) => {
    try {
        const result = await pool.query('SELECT word FROM words');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching words');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

