const Connection = require('../configs/connection.config');
const Sequelize = require('sequelize');

const db = {}

db.connection = Connection
db.op=Sequelize.Op
db.sequelize = Sequelize

db.user = require('./user.model')(Connection,Sequelize);

db.post=require('./post.model')(Connection,Sequelize);

db.role=require('./role.model')(Connection,Sequelize);

db.skillType=require('./skillType.model')(Connection,Sequelize);

db.reportPost=require('./reportPost.model')(Connection,Sequelize);

db.comment=require('./comment.model')(Connection,Sequelize);

db.reportComment = require('./reportComment.model')(Connection,Sequelize);

db.postMention = require('./postMention.model')(Connection,Sequelize);

db.commentMention=require('./commentMention.model')(Connection,Sequelize);

db.tag=require('./tag.model')(Connection,Sequelize);

db.category=require('./category.model')(Connection,Sequelize);

db.skill=require('./skill.model')(Connection,Sequelize);

db.skillVersion=require('./skillVersion.model')(Connection,Sequelize);

db.task=require('./task.model')(Connection,Sequelize);

db.reply =require('./reply.model')(Connection,Sequelize);



module.exports = db