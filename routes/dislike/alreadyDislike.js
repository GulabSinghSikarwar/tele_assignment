const Dislike=require('../../models/DisLike')

const getUserId=require('../comment/controllers/createComment').getUserId

const alreadyDisLiked = async(req,resp,next)=>{

    const token=req.cookies.jwt;
    const userId=await getUserId(token)

    const body=req.body;
    const postId=body.postId;

    const exsistingDisLike =await  Dislike.findOne(   { where :{
        userId,
        postId
    }})
    if(exsistingDisLike)
    {
        resp.status(200).json({
            status:" failed  to unlike post ",
            message:" You have already unlike the post"
        })
    }
    else {
        next()
    }



}
module.exports=alreadyDisLiked