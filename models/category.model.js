

module.exports = (connection, sequelize) => {
    const Category = connection.define("tag", {
        categoryId:{
            type:sequelize.UUID
        },
        categoryUserId:{
            type:sequelize.INT,
            unique: {
                args: true,
                msg: 'این  نام قبلا استفاده شده است'
            }
        },
        categoryName:{
            type:sequelize.STRING,
            unique: {
                args: true,
                msg: 'این  نام قبلا استفاده شده است'
            }
        }
    }
    )
    return Category
}