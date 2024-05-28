

module.exports = (connection, sequelize) => {
    const Task = connection.define("task", {
        taskId: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey:true
        },
        taskUserId: {
            type: sequelize.UUID
        },
        taskBody:{
            type:sequelize.TEXT
        },
        taskTitle:{
            type:sequelize.STRING
        },
        taskIsClose:{
            type:sequelize.BOOLEAN
        }
    },
    {
        indexes: [
            {
                using: 'BTREE',
                fields: ['taskId']
            },
            {
                using: 'BTREE',
                fields: ['taskUserId']
            },
            {
                using: 'BTREE',
                fields: ['taskTitle']
            },
        ],
    }
    )
    return Task
}