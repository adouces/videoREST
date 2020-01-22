const mysql = require('mysql2/promise');
const config = require('../config');


module.exports = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user     : config.db.user,
    password : config.db.password
}).then( connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database};`).then((res) => {
        console.info("Database create or successfully checked");
        process.exit(0);
    })
});