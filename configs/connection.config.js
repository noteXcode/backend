const { Sequelize } = require('sequelize').Sequelize
let Config = require('./db.config.js')
let config
const dialect = 'mssql'


switch (dialect) {
    case 'mssql':
        config = Config.mssql
        break;
    case 'mssql87':
        config = Config.mssql87
        break;
    default:
        config = Config.mssql
        break;
}


const connection = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        logging: true,
        charset: 'utf8',
        collate: 'utf8_persian_ci',
        host: config.HOST,
        dialect: config.dialect,
        define: {
            timestamps: true,
            freezeTableName: true,
            underscored: false,
        },
        dialectOptions: {
            useUTC: true, //for reading from database
            dateStrings: true,
            instanceName: config.dialectOptions.instanceName,
            options: { "requestTimeout": 300000 }
        },
       
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle,

        }
    }
)

module.exports = connection