const Connection = require('../configs/connection.config');
const Sequelize = require('sequelize');

const db = {}

db.connection = Connection
db.op = Sequelize.Op
db.sequelize = Sequelize

db.user = require('./user.model')(Connection, Sequelize);

db.post = require('./post.model')(Connection, Sequelize);

db.role = require('./role.model')(Connection, Sequelize);

db.skillType = require('./skillType.model')(Connection, Sequelize);

db.reportPost = require('./reportPost.model')(Connection, Sequelize);

db.comment = require('./comment.model')(Connection, Sequelize);

db.reportComment = require('./reportComment.model')(Connection, Sequelize);

db.tag = require('./tag.model')(Connection, Sequelize);

db.category = require('./category.model')(Connection, Sequelize);

db.skill = require('./skill.model')(Connection, Sequelize);

db.skillVersion = require('./skillVersion.model')(Connection, Sequelize);

db.task = require('./task.model')(Connection, Sequelize);

db.reply = require('./reply.model')(Connection, Sequelize);




//MODELS RELATIONS*********

// USER && ROLE *****
db.user.belongsToMany(db.role, {
    through: 'userRole',
    foreignKey: 'roleId',
    as: 'userRoles'
});
db.role.belongsToMany(db.user, {
    through: 'userRole',
    foreignKey: 'userId',
    as: 'users'
});


// USER && USER *****
db.user.belongsToMany(db.user, {
    through: 'follow',
    foreignKey: 'followUserId',
    as:'follows'
})
db.user.belongsToMany(db.user, {
    through: 'follow',
    foreignKey: 'followFollowerId',
    as:'followers'
})


//USER && POST *****
db.post.belongsToMany(db.user, {
    through:'postMention',
    foreignKey: 'PMuserId',
    as:'posts'
})
db.user.belongsToMany(db.post, {
    through:'postMention',
    foreignKey: 'PMpostId',
    as:'userPosts'
})


//USER && COMMENT *****
db.comment.belongsToMany(db.user, {
    through:'commentMention',
    foreignKey:'CMuserId',
})
db.user.belongsToMany(db.comment, {
    through:'commentMention',
    foreignKey:'userComments',
})


//USER && COMMENT *****
db.comment.belongsToMany(db.user, {
    through:'reportComment'
})
db.user.belongsToMany(db.comment, {
    through:'reportComment'
})


//USER && POST *****
db.post.belongsToMany(db.user, {
    through:'reportPost'
})
db.user.belongsToMany(db.post, {
    through:'reportPost'
})


//USER && POST *****
db.post.belongsToMany(db.user, {
    through:'postLike',
    foreignKey:'PLuserId',
    as:'pUsers'
})
db.user.belongsToMany(db.post, {
    through:'postLike',
    foreignKey:'PLpostId',
    as:'userlikes'
})


//USER && POST *****
db.post.belongsToMany(db.user, {
    through:'postSave',
    foreignKey:'PSuserId',
    as:'sUser'
})
db.user.belongsToMany(db.post, {
    through:'postSave',
    foreignKey:'PSpostId',
    as:'userSaves'
})

//USER && POST *****
db.post.belongsToMany(db.user, {
    through:'postView',
    foreignKey:'PVuserId',
    as:'vUsers'
})
db.user.belongsToMany(db.post, {
    through:'postView',
    foreignKey:'PVpostId',
    as:'userViews'
})


//POST && CATEGORY *****
db.post.belongsToMany(db.category, {
    through:'postCategory',
    foreignKey:'PcatCategoryId',
    as:'categories'
})
db.category.belongsToMany(db.post, {
    through:'postCategory',
    foreignKey:'PcatPostId',
    as:'catPosts'
})

//POST && TAG *****
db.post.belongsToMany(db.tag, {
    through:'postTag',
    foreignKey:'PTtagId',
    as:'tags'
})
db.tag.belongsToMany(db.post, {
    through:'postTag',
    foreignKey:'PTpostId',
    as:'tPosts'
})


//POST && SKILL VERSION *****
db.post.belongsToMany(db.skillVersion, {
    through:'postSkill',
    foreignKey:'PSKskillVersionId',
    as:'skillVersions'
})
db.skillVersion.belongsToMany(db.post, {
    through:'postSkill',
    foreignKey:'PSKpostId',
    as:'skPosts'
})





module.exports = db