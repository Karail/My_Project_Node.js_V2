



const Sequelize = require('sequelize')
const { DBconf } = require('../config/conf')
const { host, dbname, username, dbtype, password } = DBconf

module.exports = new Sequelize(dbname, username, password, {
    dialect: dbtype,
    host,
    define: {
        timestamps: false
    }
});