module.exports = (connection, sequelize) => {
    const Post = connection.define("post", {
        postId: {
            type: sequelize.UUID
        },
        postTitle:{
            type:sequelize.STRING
        },
        postBody:{
            type:sequelize.TEXT
        },
        postUserId:{
            type:sequelize.UUID
        },
        postIsPublic:{
            type:sequelize.TINYINT
        },
        postISBlock:{
            type:sequelize.TINYINT
        },
        postReferenceId:{
            type:sequelize.INT
        }
    }
    )
    return Post
}