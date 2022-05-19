let mysql = require('mysql');
const config = require('./config');

let connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

module.exports = connection;
