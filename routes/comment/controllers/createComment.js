const Comment = require('../../../models/Comment')
const Post = require('../../../models/Post')

const jwt = require('jsonwebtoken')

const createComment = async (req, resp, next) => {

    try {
        const body = req.body;
        const postId = body.postId;

        const cookies = req.cookies;

        const token = cookies.jwt;


        const userId = await getUserId(token)
        const createdComment = await createCommentHelper(userId, postId, body)

        resp.status(201).json({
            status: "Succesfully  created Comment !!",
            data: createdComment
        })


    } catch (error) {

        resp.status(400).json({
            status: "Some Error Occured   !! ",
            message: error.message
        })
    }

}
const getUserId = async (token) => {

    try {

        var decoded = jwt.verify(token, 'secret_key');
        const id = decoded.data


        return id
    } catch (error) {

        console.log(error);
    }




}
const createCommentHelper = async (userId, postId, body) => {

    const comment_body = {
        userId,
        postId,
        commentMessage: body.commentMessage

    }

    const createdComment = await Comment.create({ ...comment_body })
    const updateStatus = await updateNoOfComment(postId, true);

    console.log("post update status : ", updateStatus   );




    return createdComment;

}
const updateNoOfComment = async (postId, increment) => {

    const oldPost = await Post.findByPk(postId);

    if (increment) {
        const updateStatus = await Post.update({
            noOfComments:oldPost.noOfComments+1
        },{
            where:{
                id:postId
            }
        })
        return updateStatus;



    }
    else {
        const updateStatus = await Post.update({
            noOfComments:oldPost.noOfComments-1
        },{
            where:{
                id:postId
            }
        })
        return updateStatus;

    }

}
module.exports = { createComment, getUserId, updateNoOfComment }