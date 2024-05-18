

module.exports = (connection, sequelize) => {
    const ReportPost = connection.define("reportPost", {
        RPid:{
            type:sequelize.UUID,
            primaryKey:true
        },
        RPpostId:{
            type:sequelize.INTEGER
        },
        RPuserId:{
            type:sequelize.INTEGER
        },
        RPtext:{
            type:sequelize.STRING
        }
    }
    )
    return ReportPost
}