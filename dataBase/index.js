const mysql = require('mysql');
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '19950310xiong!',
  port: 3306,
  database: 'mydb'
})
module.exports = connection;