const sqlite3 = require('sqlite3').verbose();
// create local SQLite database
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(`
        // users table
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            role TEXT
        )
    `);

    db.run(`
        // tasks table
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            completed INTEGER DEFAULT 0,
            user_id INTEGER
        )
    `);
});

module.exports = db;