

module.exports = (connection, sequelize) => {
    const Reply = connection.define("reply", {
        replyId: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        replyUserId: {
            type: sequelize.UUID
        },
        replyBody: {
            type: sequelize.TEXT
        },
        replyGrade: {
            type: sequelize.STRING
        },
        replyIsPost: {
            type: sequelize.BOOLEAN
        },
        replyPostOption: {
            type: sequelize.TEXT
        }
    },
        {
            indexes: [
                {
                    using: 'BTREE',
                    fields: ['replyId']
                },
                {
                    using: 'BTREE',
                    fields: ['replyUserId']
                },
                {
                    using: 'BTREE',
                    fields: ['replyIsPost']
                },

            ],
        }
    )
    return Reply
}