

module.exports = (connection, sequelize) => {
    const Task = connection.define("task", {
        taskId: {
            type: sequelize.UUID
        },
        taskUserId: {
            type: sequelize.INT
        },
        taskBody:{
            type:sequelize.TEXT
        },
        taskTitle:{
            type:sequelize.STRING
        },
        taskIsClose:{
            type:sequelize.TINYINT
        }
    }
    )
    return Task
}