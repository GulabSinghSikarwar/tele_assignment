const sequelize = require('../database')
const { DataTypes, UUIDV4 } = require('sequelize')

const Like = sequelize.define('like',
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
       


    }
)
Like.associate = (models) => {
    Like.belongsTo(models.users, {
        foreignKey: userId,
        targetKey: id,
        as: "user"
    })
    Like.belongsTo(models.posts, {
        foreignKey: "postId",
        targetKey: "id",
        as: "post"
    })
}


module.exports = Like;
