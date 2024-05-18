

module.exports = (connection, sequelize) => {
    const Comment = connection.define("comment", {
        commentId:{
            type:sequelize.INTEGER,
            primaryKey:true
        },
        commentUserId:{
            type:sequelize.INTEGER,
        },
        commentPostId:{
            type:sequelize.INTEGER
        },
        commentReferenceId:{
            type:sequelize.INTEGER
        },
        commentBody:{
            type:sequelize.TEXT
        }
    }
    )
    return Comment
}