

module.exports = (connection, sequelize) => {
    const ReportPost = connection.define("reportPost", {
        RP_id:{
            type:sequelize.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        RP_postId:{
            type:sequelize.INTEGER
        },
        RP_userId:{
            type:sequelize.UUID
        },
        RP_text:{
            type:sequelize.STRING
        }
    },
    {
        indexes: [
            {
                using: 'BTREE',
                fields: ['RP_id']
            },
            {
                using: 'BTREE',
                fields: ['RP_postId']
            },
        ],
    }
    )
    return ReportPost
}