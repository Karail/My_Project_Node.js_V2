
  
const Sequelize = require('sequelize');
import { DBconf } from '../config/conf';

const { host, dbname, username, password } = DBconf

export default new Sequelize(dbname, username, password, {
    dialect: 'mysql',
    host,  
    define: {
        timestamps: false
    }
});