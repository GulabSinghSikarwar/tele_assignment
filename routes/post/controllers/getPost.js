const { all } = require('../..');
const Post = require('../../../models/Post')
const getUserId = require('../../comment/controllers/createComment').getUserId
const getPostById = async (req, resp, next) => {
    try {

        const postId = req.params.id;
        const post = await Post.findByPk(postId)
        resp.status(200).json({
            status: "success ! ",
            post
        })


    } catch (error) {
        resp.status(400).json({
            status :" some error Occured !!" ,
            message :error.message
        })
    }
}
const getAllPosts = async (req, resp) => {

    try {

        const token = req.cookies.jwt;
        const userId = await getUserId(token)

        const allPost = await Post.findAll({
            where: {
                userId
          
            }
        })

        resp.status(200).json({
            status :"success !! ",
            data:allPost
        })
    } catch (error) {
        resp.status(400).json({
            status :" some error Occured !!" ,
            message :error.message
        })
    }
}
module.exports = { getPostById ,getAllPosts}