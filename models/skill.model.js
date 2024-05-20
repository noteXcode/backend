

module.exports = (connection, sequelize) => {
    const Skill = connection.define("skill", {
       skillId:{
        type:sequelize.UUID,
        primaryKey:true
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
    },{
        indexes: [
            {
                using:'BTREE',
                field:['skillName']
            },
        ],
        hooks: {
            beforeCreate:async(_name)=> {
                _name.skillName=_name.skillName.toLowerCase()
            },
            
        }
    }
    )
    return Skill
}