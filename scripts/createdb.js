const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize("", config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port,
    logging: config.db.logging
});

module.exports = (exitOnFinish = true) => 
    sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database};`)
    .then(() => {
        console.info("Database create or successfully checked");
        if(exitOnFinish){
            process.exit(0);
        }
    });