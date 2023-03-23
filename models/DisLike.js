const sequelize = require('../database')
const { DataTypes, UUIDV4 } = require('sequelize')

const Dislike = sequelize.define('dislike',
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
Dislike.associate = (models) => {
    Dislike.belongsTo(models.users, {
        foreignKey: userId,
        targetKey: id,
        as: "user"
    })
    Dislike.belongsTo(models.posts, {
        foreignKey: "postId",
        targetKey: "id",
        as: "post"
    })
}


module.exports = Dislike;
