

module.exports = (connection, sequelize) => {
    const Post = connection.define("post", {
        postId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        postTitle: {
            type: sequelize.STRING
        },
        postBody: {
            type: sequelize.TEXT
        },
        postUserId: {
            type: sequelize.UUID
        },
        postIsPublic: {
            type: sequelize.BOOLEAN
        },
        postIsBlock: {
            type: sequelize.BOOLEAN
        },
        postReferenceId: {
            type: sequelize.INTEGER
        }
    },
        {
            indexes: [
                {
                    using: 'BTREE',
                    fields: ['postTitle']
                },
                {
                    using: 'BTREE',
                    fields: ['postId']
                },
                {
                    using: 'BTREE',
                    fields: ['postIsPublic']
                },
               
            ],
        }
    )
    return Post
}