

module.exports = (connection, sequelize) => {
    const Skill = connection.define("skill", {
       skillId:{
        type:sequelize.UUID
       },
       skillName:{
        type:sequelize.STRING,
        unique: {
            args: true,
            msg: 'این  نام قبلا استفاده شده است'
        }
       },
       skillTypeId:{
        type:sequelize.UUID
       }
    }
    )
    return Skill
}