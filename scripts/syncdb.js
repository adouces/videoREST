const sequelize = require('../lib/dbconnection');



module.exports = () => sequelize.sync();