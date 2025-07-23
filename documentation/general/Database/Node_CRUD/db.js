// This module handles the database connection setup using mysql2
// Docs for mysql2: https://www.npmjs.com/package/mysql2
// We're using the promise-based API so we can await everything

const mysql = require('mysql2/promise');

// Hardcoded database name — update this if schema name changes
const dbName = 'recservices';

// Connect to the MySQL database using credentials provided by user
async function connectToDatabase(user, password) {
  console.log(`\nConnecting to MySQL Database: ${dbName}...`);

  try {
    // Create connection object with credentials
    const connection = await mysql.createConnection({
      host: 'localhost', // assume dev local machine
      user,
      password,
      database: dbName
    });

    console.log(`Connection to ${dbName} successful!\n`);
    return connection;
  } catch (err) {
    // If connection fails, show error and exit program
    console.error(`Failed to connect to ${dbName}:`, err.message);
    process.exit(1);
  }
}

module.exports = connectToDatabase;

// =====================
// Future Dev Ideas for db.js
// =====================
// - Support remote db host via .env file
// - Add fallback reconnect logic if DB drops
// - Create a single pool connection instead of one-off connections
//   using mysql2.createPool() for larger applications