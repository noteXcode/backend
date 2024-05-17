

module.exports = (connection, sequelize) => {
    const SkillVersion = connection.define("skillVersion", {
      SVid:{
        type:sequelize.UUID
      },
      SVskillId:{
        type:sequelize.UUID
      },
      SVversion:{
        type:sequelize.STRING
      }
    }
    )
    return SkillVersion
}