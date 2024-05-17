

module.exports = (connection, sequelize) => {
    const ReportComment = connection.define("reportComment", {
        RCid: {
            type: sequelize.UUID
        },
        RCcommentId: {
            type: sequelize.INT
        },
        RCuserId:{
            type:sequelize.INT
        },
        RCtext:{
            type:sequelize.TEXT
        }
    }
    )
    return ReportComment
}