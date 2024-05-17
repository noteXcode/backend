

module.exports = (connection, sequelize) => {
    const Reply = connection.define("reply", {
        replyId: {
            type: sequelize.UUID
        },
        replyUserId: {
            type: sequelize.INT
        },
        replyBody:{
            type:sequelize.TEXT
        },
        replyGrade:{
            type:sequelize.STRING
        },
        replyIsPost:{
            type:sequelize.TINYINT
        },
        replyPostOption:{
            type:sequelize.TEXT
        }
    }
    )
    return Reply
}