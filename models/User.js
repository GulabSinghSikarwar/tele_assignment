const {Sequelize,DataTypes,UUIDV4} = require('sequelize')
const sequelize=require('../database')

const Post =require('./Post')

const User = sequelize.define('user',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false

        },
        username: {
            type: DataTypes.STRING,
            allowNull: false


        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false


        },
        password: {
            type: DataTypes.STRING,
            allowNull: false


        }
    })

    // User.hasMany(Post,{
    //     foreignKey:"userId",
    //     target:"id",
    //     as:"post"

    // })
    User.associate=(models)=>{
        
    User.hasMany(models.posts,{
        foreignKey:"userId",
        target:"id",
        as:"post"

    })
    
    User.hasMany(models.comments,{
        foreignKey:"userId",
        target:"id",
        as:"comment"

    })
    User.hasMany(models.likes,{
        foreignKey:"userId",
        target:"id",
        as:"like"

    })
    User.hasMany(models.dislikes,{
        foreignKey:"userId",
        target:"id",
        as:"dislike"

    })

    }
    // console.log(User === sequelize.models.User);

    module.exports=User;
