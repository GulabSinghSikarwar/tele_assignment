const Comment = require('../../../models/Comment')
const getAllComments = async (req, resp, next) => {

    try {
        const allComments = await Comment.findAll()

        resp.status(200).json({
            status:"Successfully fetched all data",
            comments:   allComments
        })

    } catch (error) {

        resp.status(400).json({
            status :"Some Error Occured !!",
            message:error.message
        })
 
    }

}
const getCommentById=async (req,resp ,next )=>{
    

    try {
        const id =req.params.id;

        const comment = await Comment.findByPk(id)

        resp.status(200).json({
            status:"Successfully fetched all data",
            comment:comment
        })

    } catch (error) {

        resp.status(400).json({
            status :"Some Error Occured !!",
            message:error.message
        })
 
    }

}
module.exports = {getAllComments,getCommentById};
