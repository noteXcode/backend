

module.exports = (connection, sequelize) => {
    const User = connection.define("user", {
        userId: {
            type: sequelize.UUID,
            primaryKey: true
        },
        userEmail: {
            type: sequelize.STRING,
            unique: {
                args: true,
                msg: 'این  نام قبلا استفاده شده است'
            }
            // allowNull: false,
        },
        userJobTitle: {
            type: sequelize.STRING
        },
        userBio: {
            type: sequelize.TEXT
        },
        userDefaultLanguage: {
            type: sequelize.STRING
        },
        userIsActive: {
            type: sequelize.BOOLEAN
        },
        userFirstName: {
            type: sequelize.STRING
        },
        userLastName: {
            type: sequelize.STRING
        },
        userLocation: {
            type: sequelize.STRING
        },
        userName: {
            type: sequelize.STRING
        },
        userToken: {
            type: sequelize.STRING
        },
        userSaltToken: {
            type: sequelize.STRING
        },
        userLastLoginIp: {
            type: sequelize.STRING
        },
        userLastLoginTime: {
            type: sequelize.STRING
        },
        userOtherToken: {
            type: sequelize.TEXT
        },
        userPassword: {
            type: sequelize.STRING
        },
        userCompany: {
            type: sequelize.STRING
        },
        userProfile: {
            type: sequelize.TEXT
        }
    }, {
        indexes: [
            {
                using:'BTREE',
                field:['userEmail']
            },
            {
                using:'BTREE',
                field:['userJobTitle']
            },
            {
                using:'BTREE',
                field:['userName']
            },
            {
                using:'BTREE',
                field:['userCompany']
            },
            {
                using:'BTREE',
                field:['userProfile']
            },
        ],
        hooks: {
            beforeCreate:async(_email)=> {
                _email.userEmail=_email.userEmail.toLowerCase()
            },
            
        }
    }
    )
    return User
}