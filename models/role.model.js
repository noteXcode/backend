

module.exports = (connection, sequelize) => {
    const Role = connection.define("role", {
        roleId: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        roleName: {
            type: sequelize.STRING,
            unique: {
                args: true,
                msg: 'this name has already been used'
            },
            set(value) {
                this.setDataValue('roleName', value.trim().toLowerCase())
            },
        }
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['roleName']
            },
        ],
    }
    )
    return Role
}