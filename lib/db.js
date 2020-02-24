//user and password are censored

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'opentutorials'
});
module.exports = db;
