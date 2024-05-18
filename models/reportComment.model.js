

module.exports = (connection, sequelize) => {
    const ReportComment = connection.define("reportComment", {
        RCid: {
            type: sequelize.UUID,
            primaryKey:true
        },
        RCcommentId: {
            type: sequelize.INTEGER
        },
        RCuserId:{
            type:sequelize.INTEGER
        },
        RCtext:{
            type:sequelize.TEXT
        }
    }
    )
    return ReportComment
}