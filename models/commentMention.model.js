

module.exports = (connection, sequelize) => {
    const CommentMention = connection.define("commentMention", {
        CMcommentId:{
            type:sequelize.INT
        },
        CMuserId:{
            type:sequelize.INT
        }
    }
    )
    return CommentMention
}