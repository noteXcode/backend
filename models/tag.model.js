

module.exports = (connection, sequelize) => {
    const Tag = connection.define("tag", {
        tagId:{
            type:sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey:true
        },
        tagText:{
            type:sequelize.TEXT
        }
    },
    {
        indexes: [
            {
                using: 'BTREE',
                fields: ['tagId']
            }
        ],
    }
    )
    return Tag
}