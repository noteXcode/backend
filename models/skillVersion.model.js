
module.exports = (connection, sequelize) => {
    const SkillVersion = connection.define("skillVersion", {
      SV_id:{
        type:sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
      },
      SV_skillId:{
        type:sequelize.UUID
      },
      SV_version:{
        type:sequelize.STRING
      }
    },
    {
      indexes: [
          {
              using: 'BTREE',
              fields: ['SV_id']
          },
          {
              using: 'BTREE',
              fields: ['SV_skillId']
          }
      ],
  }
    )
    return SkillVersion
}