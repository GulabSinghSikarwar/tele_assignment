
const Comment =require('../../../models/Comment')

const updateComment =async (req,resp,next)=>{

    try {

        const id=req.params.id
        const body=req.body;

        const updatedCommentStatus= await Comment.update(
            {
                    ...body
            },{
                where:{
                    id
                }
            }
        )
        
       resp.status(201).json({
        status :"successfuly Updated ",
        updatedCommentStatus
       }) 
    } catch (error) {
        resp.status(400).json({
            status: "Some Error Occured   !! ",
            message: error.message
        })
    }
}
module.exports=updateComment