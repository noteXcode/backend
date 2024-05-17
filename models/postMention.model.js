

module.exports = (connection, sequelize) => {
    const PostMention = connection.define("postMention", {
        PMpostId:{
            type:sequelize.INT
        },
        PMuserId:{
            type:sequelize.INT
        }
    }
    )
    return PostMention
}