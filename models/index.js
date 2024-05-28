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
    foreignKey: 'UR_userId',
    as: 'userRoles',
    timestamps: false,
});
db.role.belongsToMany(db.user, {
    through: 'userRole',
    foreignKey: 'UR_roleId',
    as: 'users'
});


// USER && USER (FOLLOW)*****
db.user.belongsToMany(db.user, {
    through: 'follow',
    foreignKey: 'followUserId',
    as: 'follows'
})
db.user.belongsToMany(db.user, {
    through: 'follow',
    foreignKey: 'followFollowerId',
    as: 'followers'
})


//POST && USER ******
db.user.hasMany(db.post,{
    foreignKey:"postUserId",
    as:"userPost"
})
db.post.belongsTo(db.user,{
    foreignKey:"postUserId",
    as:"postUser"
})


//SKILL AND SKILLVERSION *****
db.skill.hasMany(db.skillVersion,{
    foreignKey:"SV_skillId",
    as:"skills"
})
db.skillVersion.belongsTo(db.skill,{
    foreignKey:"SV_skillId",
    as:"skillVersions"
})


//TASK AND USER *****
db.user.hasMany(db.task,{
    foreignKey:"taskUserId",
    as:"userTasks"
})
db.task.belongsTo(db.user,{
    foreignKey:"taskUserId",
    as:"taskUser"
})


//REPLY AND USER *****
db.user.hasMany(db.reply,{
    foreignKey:"replyUserId",
    as:"userReply"
})
db.reply.belongsTo(db.user,{
    foreignKey:"replyUserId",
    as:"replies"
})


//USER && COMMENT (COMMENT MENTION)*****
db.comment.belongsToMany(db.user, {
    through: 'commentMention',
    foreignKey: 'CM_commentId',
    as: 'commentUsers'
})
db.user.belongsToMany(db.comment, {
    through: 'commentMention',
    foreignKey: 'CM_userId',
    as: 'usersComment'
})



//USER && COMMENT (REPORT COMMENT)*****
db.comment.belongsToMany(db.user, {
    through: 'reportComment',
    foreignKey: 'RC_commentId',
    as: 'rpCommentUsers'
})
db.user.belongsToMany(db.comment, {
    through: 'reportComment',
    foreignKey: 'RC_userId',
    as: 'rpUserComments'
})


//USER && POST (REPORT POST)*****
db.post.belongsToMany(db.user, {
    through: 'reportPost',
    foreignKey: 'RP_postId',
    as: 'rpPostUsers',
})
db.user.belongsToMany(db.post, {
    through: 'reportPost',
    foreignKey: 'RP_userId',
    onDelete: 'NO ACTION',
    as: 'rpUserPosts'
})

//USER && POST (POST MENTION)*****
db.post.belongsToMany(db.user, {
    through: 'postMention',
    foreignKey: 'PM_postId',
    as: 'mentionUsers',
})
db.user.belongsToMany(db.post, {
    through: 'postMention',
    foreignKey: 'PM_userId',
    as: 'mentionPosts',
    onDelete: 'NO ACTION',
})

//USER && POST (POST LIKE) *****
db.post.belongsToMany(db.user, {
    through: 'postLike',
    foreignKey: 'PL_postId',
    as: 'postUsers',
})
db.user.belongsToMany(db.post, {
    through: 'postLike',
    foreignKey: 'PL_userId',
    as: 'userLikePost',
    onDelete: 'NO ACTION',
})


//USER && POST (POST SAVE) *****
db.post.belongsToMany(db.user, {
    through: 'postSave',
    foreignKey: 'PS_postId',
    as: 'postSaveUser',
})
db.user.belongsToMany(db.post, {
    through: 'postSave',
    foreignKey: 'PS_userId',
    as: 'userSavePosts',
    onDelete: 'NO ACTION',
})

//USER && POST (POST VIEW) *****
db.post.belongsToMany(db.user, {
    through: 'postView',
    foreignKey: 'PV_postId',
    as: 'vUsers'
})
db.user.belongsToMany(db.post, {
    through: 'postView',
    foreignKey: 'PV_userId',
    onDelete: 'NO ACTION',
    as: 'userViews'
})


//POST && CATEGORY *****
db.post.belongsToMany(db.category, {
    through: 'postCategory',
    foreignKey: 'PcatPostId',
    as: 'categories'
})
db.category.belongsToMany(db.post, {
    through: 'postCategory',
    foreignKey: 'PcatCategoryId',
    as: 'catPosts'
})

//POST && TAG *****
db.post.belongsToMany(db.tag, {
    through: 'postTag',
    foreignKey: 'PT_postId',
    as: 'tags'
})
db.tag.belongsToMany(db.post, {
    through: 'postTag',
    foreignKey: 'PT_tagId',
    as: 'tPosts'
})


//POST && SKILL VERSION *****
db.post.belongsToMany(db.skillVersion, {
    through: 'postSkill',
    foreignKey: 'PSK_postId',
    as: 'postSkillVersions'
})
db.skillVersion.belongsToMany(db.post, {
    through: 'postSkill',
    foreignKey: 'PSK_skillVersionId',
    as: 'skPosts'
})





module.exports = db