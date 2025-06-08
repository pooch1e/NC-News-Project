const { Pool, types } = require('pg');

types.setTypeParser(20, (val) => parseInt(val, 10));

const ENV = process.env.NODE_ENV || 'development';

// Load the right .env file according to ENV
require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });

// Check env variables
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error(
    'PGDATABASE or DATABASE_URL environment variable must be set'
  );
}

console.log('NODE_ENV:', ENV);
console.log('PGDATABASE:', process.env.PGDATABASE);
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Build config object depending on environment
const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2; // Optional pool max connections for production
}

// Create pool
const db = new Pool(config);


module.exports = db;
