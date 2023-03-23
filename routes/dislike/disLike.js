const Dislike = require('../../models/DisLike')
const Like =require('../../models/Like')
const Post = require('../../models/Post')

const getUserId = require('../comment/controllers/createComment').getUserId
const dislikePost = async (req, resp) => {
    //  postId 
    // userId 

    try {

        const token = req.cookies.jwt;

        const userId = await getUserId(token);

        const body = req.body;
        const postId = body.postId;

        const createdDislike = await Dislike.create({ userId, postId });
        const destroyedStatus=await Like.destroy({
            where:{
                userId,postId
            }
        })


        updateDislikeCount(postId ,destroyedStatus);
        resp.status(200).json({
            status: "successfuly disliked the post ",
            createdDislike,
            
        })



    } catch (error) {
        resp.status(400).json({
            status: "Some Error Occured   !! ",
            message: error.message
        })
    }
}
const updateDislikeCount = async (postId,destroyedStatus) => {


    const oldPost = await Post.findByPk(postId);

    const updateDislikeCountState = await Post.update({
        noOfDislikes: oldPost.noOfDislikes + 1,
        noOfLikes:oldPost.noOfLikes-destroyedStatus,
    }, {
        where: {
            id: postId
        }
    })

}
module.exports = dislikePost;
