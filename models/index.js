const Connection = require('../configs/connection.config');
const Sequelize = require('sequelize');

const db = {}

db.connection = Connection
db.op=Sequelize.Op
db.sequelize = Sequelize

db.user = require('../models/user.model')(Connection,Sequelize);


module.exports = db