const Post =require('../../../models/Post')


const deletePostById = async (req, resp,next)=>{

    try {

        const id=req.params.id;
        const deleteStatus=await Post.destroy({
            where:{
                id
            }
        })

        resp.status(201).json({
            status:"Deleted Succesfully",
            deleteStatus
        })

        
    } catch (error) {
        resp.status(400).json({
            status: "Some error Occured !! ",
            message: error.message
        })
    }
}

module.exports =deletePostById