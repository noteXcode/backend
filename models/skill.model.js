

module.exports = (connection, sequelize) => {
    const Skill = connection.define("skill", {
        skillId: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        skillName: {
            type: sequelize.STRING,
            unique: {
                args: true,
                msg: 'this name has already been used'
            },
            set(value) {
                this.setDataValue('skillName', value.trim().toLowerCase())
            },
        },
        skillTypeId: {
            type: sequelize.UUID
        },
        skillUserId:{
            type: sequelize.UUID
        },
        skillIsActive:{
            type: sequelize.BOOLEAN
        }
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['skillName']
            },
            {
                using: 'BTREE',
                fields: ['skillId']
            },
        ]
    }
    )
    return Skill
}