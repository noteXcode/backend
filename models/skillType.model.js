

module.exports = (connection, sequelize) => {
    const SkillType = connection.define("skillType", {
        STid:{
            type:sequelize.UUID,
            primaryKey:true
        },
        STname:{
            type:sequelize.STRING,
            unique: {
                args: true,
                msg: 'این  نام قبلا استفاده شده است'
            }
        },
        STdsc:{
            type:sequelize.STRING
        }
    }
    )
    return SkillType
}