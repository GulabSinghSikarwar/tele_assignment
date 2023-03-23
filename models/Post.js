const sequelize = require('../database')
const User = require('./User')
const { DataTypes, UUIDV4, } = require('sequelize')

const Post = sequelize.define('post',
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
        title: {
            type: DataTypes.STRING,
            allowNull: false

        },
        content: {
            type: DataTypes.STRING,
            allowNull: true

        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        noOfLikes: {
            type: DataTypes.INTEGER,
            allowNull: false ,
            defaultValue: 0,

        },
        noOfDislikes: {
            type: DataTypes.INTEGER,
            allowNull: false ,
            defaultValue: 0,
        },
        noOfComments: {
            type: DataTypes.INTEGER,
            allowNull: false ,
            defaultValue: 0,

        },

    })
// Post.belongsTo(User ,{
//     foreignKey:"userId",
//     targetKey:"id",
//     as:"user"

// })

Post.associate = (models) => {
    Post.belongsTo(models.users, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user"
    })
    Post.hasMany(models.comments, {
        foreignKey: "postId",
        targetKey: "id",
        as: "comment"
    })
    Post.hasMany(models.likes, {
        foreignKey: "postId",
        targetKey: "id",
        as: "like"
    })
    Post.hasMany(models.dislikes, {
        foreignKey: "postId",
        targetKey: "id",
        as: "dislike"
    })
}
module.exports = Post;

