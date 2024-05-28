

module.exports = (connection, sequelize) => {
    const Category = connection.define("category", {
        categoryId: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        categoryUserId: {
            type: sequelize.UUID,
        },
        categoryName: {
            type: sequelize.STRING,
        }
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['categoryName']
            },
            {
                unique:true,
                fields:['categoryUserId','categoryName']
            }
        ],

    }
    )
    return Category
}