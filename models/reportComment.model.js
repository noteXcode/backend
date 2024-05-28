

module.exports = (connection, sequelize) => {
    const ReportComment = connection.define("reportComment", {
        RC_id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey:true
        },
        RC_commentId: {
            type: sequelize.INTEGER
        },
        RC_userId:{
            type:sequelize.UUID
        },
        RC_text:{
            type:sequelize.TEXT
        }
    },
    {
        indexes: [
            {
                using: 'BTREE',
                fields: ['RC_userId']
            },
            {
                using: 'BTREE',
                fields: ['RC_commentId']
            },
            {
                using: 'BTREE',
                fields: ['RC_id']
            },
           
        ],
    }
    )
    return ReportComment
}