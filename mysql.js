const mysql = require('mysql2');

let pool = mysql.createPool({
  user: 'root',
  password: 'root',
  database: 'ecommerce',
  host: 'localhost',
  port: 3307,
});

exports.pool = pool;
