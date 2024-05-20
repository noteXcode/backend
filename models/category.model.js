

module.exports = (connection, sequelize) => {
    const Category = connection.define("category", {
        categoryId: {
            type: sequelize.UUID,
            primaryKey: true
        },
        categoryUserId: {
            type: sequelize.INTEGER,
            // unique: {
            //     args: true,
            //     msg: 'این  نام قبلا استفاده شده است'
            // }
        },
        categoryName: {
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
                field: ['categoryName']
            },
        ],
        hooks: {
            beforeCreate: async (_name) => {
                _name.categoryName = _name.categoryName.toLowerCase()
            },

        }
    }
    )
    return Category
}