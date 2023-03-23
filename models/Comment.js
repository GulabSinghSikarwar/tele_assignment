const sequelize = require('../database')
const { DataTypes, UUIDV4 } = require('sequelize')

const Comment = sequelize.define('comment',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false

        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false

        },
        postId: {
            type: DataTypes.UUID,
            allowNull: false

        },
        commentMessage: {
            type: DataTypes.STRING,
            allowNull: false

        },


    }
)
Comment.associate = (models) => {
    Comment.belongsTo(models.users, {
        foreignKey: userId,
        targetKey: id,
        as: "user"
    })
    Comment.belongsTo(models.posts, {
        foreignKey: "postId",
        targetKey: "id",
        as: "post"
    })
}


module.exports = Comment;
