

module.exports = (connection, sequelize) => {
    const Task = connection.define("task", {
        taskId: {
            type: sequelize.UUID,
            primaryKey:true
        },
        taskUserId: {
            type: sequelize.INTEGER
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