const Like =require('../../models/Like')

const getUserId=require('../comment/controllers/createComment').getUserId

const alreadyLiked = async(req,resp,next)=>{

    const token=req.cookies.jwt;
    const userId=await getUserId(token)

    const body=req.body;
    const postId=body.postId;

    const exsistingLike =await  Like.findOne(   { where :{
        userId,
        postId
    }})
    if(exsistingLike)
    {
        resp.status(200).json({
            status:" failed  to like post ",
            message:" You have already like the post"
        })
    }
    else {
        next()
    }



}
module.exports=alreadyLiked