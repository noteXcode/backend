

module.exports = (connection, sequelize) => {
    const SkillType = connection.define("skillType", {
        ST_id:{
            type:sequelize.UUID,
            primaryKey:true
        },
        ST_name:{
            type:sequelize.STRING,
            unique: {
                args: true,
                msg: 'this name has already been used'
            },
            set(value) {
                this.setDataValue('ST_name', value.trim().toLowerCase())
            },

        },
        ST_dsc:{
            type:sequelize.STRING
        }
    },{
        indexes: [
            {
                using:'BTREE',
                fields:['ST_name']
            },
            {
                using:'BTREE',
                fields:['ST_id']
            },
        ],
        
    }
    )
    return SkillType
}