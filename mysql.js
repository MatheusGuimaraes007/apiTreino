require('dotenv').config();
const mysql = require('mysql2');

let pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'ecommerce',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

exports.pool = pool;
