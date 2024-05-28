

module.exports = (connection, sequelize) => {
    const Comment = connection.define("comment", {
        commentId:{
            type:sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        commentUserId:{
            type:sequelize.UUID,
        },
        commentPostId:{
            type:sequelize.INTEGER
        },
        commentReferenceId:{
            type:sequelize.INTEGER
        },
        commentBody:{
            type:sequelize.TEXT
        }
    },
    {
        indexes: [
            {
                using: 'BTREE',
                fields: ['commentId']
            },
            {
                using: 'BTREE',
                fields: ['commentReferenceId']
            },
            {
                using: 'BTREE',
                fields: ['commentUserId']
            },
            {
                using: 'BTREE',
                fields: ['commentPostId']
            },
           
        ],
    }
    )
    return Comment
}