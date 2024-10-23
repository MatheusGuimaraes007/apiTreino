require('dotenv').config();
const mysql = require('mysql2');

let pool = mysql.createPool({
  user: 'Matheus',
  password: process.env.DB_PASS,
  database: 'defaultdb',
  host: process.env.DB_HOST,
  port: 25060,
});

exports.pool = pool;
