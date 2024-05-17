

module.exports = (connection, sequelize) => {
    const Comment = connection.define("comment", {
        commentId:{
            type:sequelize.INT
        },
        commentUserId:{
            type:sequelize.INT,
        },
        commentPostId:{
            type:sequelize.INT
        },
        commentReferenceId:{
            type:sequelize.INT
        },
        commentBody:{
            type:sequelize.TEXT
        }
    }
    )
    return Comment
}