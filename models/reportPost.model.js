

module.exports = (connection, sequelize) => {
    const ReportPost = connection.define("reportPost", {
        RPid:{
            type:sequelize.UUID
        },
        RPpostId:{
            type:sequelize.INT
        },
        RPuserId:{
            type:sequelize.INT
        },
        RPtext:{
            type:sequelize.STRING
        }
    }
    )
    return ReportPost
}