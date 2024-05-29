

module.exports = (connection, sequelize) => {
    const Tag = connection.define("tag", {
        tagId:{
            type:sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey:true
        },
        tagText:{
            type:sequelize.TEXT
        },
        tagUserId:{
            type:sequelize.UUID
        },
        tagIsActive:{
            type:sequelize.BOOLEAN
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