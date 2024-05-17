const Connection = require('../configs/connection.config');
const Sequelize = require('sequelize');

const db = {}

db.connection = Connection
db.op=Sequelize.Op
db.sequelize = Sequelize

db.user = require('./user.model')(Connection,Sequelize);

db.post=require('./post.model')(Connection,Sequelize);

module.exports = db