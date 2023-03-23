const Like = require('../../models/Like')
const Dislike= require('../../models/DisLike')

const Post= require('../../models/Post')

const getUserId =require('../comment/controllers/createComment').getUserId

//  like post 
//  delete the unlike post with same credential 
//  update the no likes and unlikes 

const likePost = async (req, resp) => {
    //  postId 
    // userId 

    try {
        
        const token=req.cookies.jwt;

        const userId=await getUserId(token);

        const body =req.body;
        const postId=body.postId;

        const createdLike= await Like.create({userId,postId});
        const destroyedStatus =await Dislike.destroy({
            where:{
                userId,postId
            }
        })

        updateLikeCount(postId ,destroyedStatus);
        resp.status(200).json({
            status :"successfuly liked the post ",
            createdLike
           }) 


        
    } catch (error) {
        resp.status(400).json({
            status: "Some Error Occured   !! ",
            message: error.message
        })
    }
}
const updateLikeCount = async (postId , destroyedStatus)=>{

    
    const oldPost = await Post.findByPk(postId);

    const updateLikeCountState= await Post.update({
        noOfLikes:oldPost.noOfLikes+1,
        noOfDislikes:oldPost.noOfDislikes-destroyedStatus
    },{
        where:{
            id:postId
        }
    })

}
module.exports=likePost;
