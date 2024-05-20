

module.exports = (connection, sequelize) => {
    const Role = connection.define("role", {
        roleId: {
            type: sequelize.UUID,
            primaryKey: true
        },
        roleName: {
            type: sequelize.STRING,
            unique: {
                args: true,
                msg: 'این  نام قبلا استفاده شده است'
            }
        }
    }, {
        indexes: [
            {
                using: 'BTREE',
                field: ['roleName']
            },
        ],
        hooks: {
            beforeCreate: async (_name) => {
                _name.roleName = _name.roleName.toLowerCase()
            },
        }
    }
    )
    return Role
}