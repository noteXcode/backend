

module.exports = (connection, sequelize) => {
    const Tag = connection.define("tag", {
        tagId:{
            type:sequelize.UUID
        },
        tagText:{
            type:sequelize.TEXT
        }
    }
    )
    return Tag
}