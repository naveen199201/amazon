// db.js
const { Pool } = require('pg');

// Configure your PostgreSQL connection settings here
const pool = new Pool({
  user: 'jdncdiaz',
  host: 'jelani.db.elephantsql.com',
  database: 'jdncdiaz',
  password: 'SNVWXdUkcT6vEL2hEHEooiXkx9mHNYq7',
  port: 5432, // default port for PostgreSQL
});

// Function to initialize the tables if they don't exist
const initializeTables = async () => {
  try {
    // Connect to the database
    const client = await pool.connect();

    // Query to check and create `users` table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `);

    // Query to check and create `addresses` table
    await client.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        street VARCHAR(255),
        city VARCHAR(100),
        state VARCHAR(100),
        zip_code VARCHAR(20)
      );
    `);

    // Query to check and create `cart_items` table
    await client.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL,
        product_name VARCHAR(255),
        quantity INTEGER,
        price DECIMAL(10, 2),
        UNIQUE(user_id, product_id) 
      );
    `);

    // Query to check and create `payment_history` table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payment_history (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50)
      );
    `);

    console.log('Tables checked/created successfully!');
    client.release();
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
};

// Export the pool and initialization function
module.exports = { pool, initializeTables };
