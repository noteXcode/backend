

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
    },{
        indexes: [
            {
                using:'BTREE',
                field:['STname']
            },
        ],
        hooks: {
            beforeCreate:async(_name)=> {
                _name.STname=_name.STname.toLowerCase()
            },
            
        }
    }
    )
    return SkillType
}