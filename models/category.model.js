

module.exports = (connection, sequelize) => {
    const Category = connection.define("category", {
        categoryId:{
            type:sequelize.UUID,
            primaryKey:true
        },
        categoryUserId:{
            type:sequelize.INTEGER,
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