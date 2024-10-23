require('dotenv').config();
const mysql = require('mysql2');

let pool = mysql.createPool({
  user: 'Matheus',
  password: 'AVNS_Tmk7RqYEHT6pq6V7YuZ',
  database: 'defaultdb',
  host: 'db-mysql-nyc3-88566-do-user-17142564-0.d.db.ondigitalocean.com',
  port: 25060,
});

exports.pool = pool;
