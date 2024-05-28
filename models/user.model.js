

module.exports = (connection, sequelize) => {
    const User = connection.define("user", {
        userId: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        userEmail: {
            type: sequelize.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'this email is not valid'
                }
            },
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
        },
        userMobile:{
            type:sequelize.STRING
        }
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['userEmail']
            },
            {
                using: 'BTREE',
                fields: ['userJobTitle']
            },
            {
                using: 'BTREE',
                fields: ['userName']
            },
            {
                using: 'BTREE',
                fields: ['userCompany']
            },
        ],
    }
    )
    return User
}