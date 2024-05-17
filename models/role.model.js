

module.exports = (connection, sequelize) => {
    const Role = connection.define("role", {
       roleId:{
        type:sequelize.UUID
       },
       roleName:{
        type: sequelize.STRING,
        unique: {
            args: true,
            msg: 'این  نام قبلا استفاده شده است'
        }
       }
    }
    )
    return Role
}