const Comment=require('../../../models/Comment')
const updateCommentCount=require('./createComment').updateNoOfComment
const deleteComment= async (req,resp,next)=>{
try {
    
    const id=req.params.id;
    
    const comment= await Comment.findByPk(id)
    const postId=comment.postId;

    const deleteCommentStatus = await Comment.destroy({
        where:{
            id
        }
    
    })
    updateCommentCount(postId,false)
    

    
    resp.status(200).json({
        status :"successfuly Deleted Comment",
        deleteCommentStatus
       }) 
    } catch (error) {
        resp.status(400).json({
            status: "Some Error Occured   !! ",
            message: error.message
        })
    }
}
module.exports=deleteComment;
