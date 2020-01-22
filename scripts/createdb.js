const sequelize = require('../lib/dbconnection');
const config = require('../config');


module.exports = (exitOnFinish = true) => 
    sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database};`)
    .then(() => {
        console.info("Database create or successfully checked");
        if(exitOnFinish){
            process.exit(0);
        }
    });