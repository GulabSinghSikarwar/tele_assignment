const getAllComments =require('./getComment').getAllComments
const getCommentById=require('./getComment').getCommentById
const createComment =require('./createComment').createComment
const updateComment=require('./updateComment')
const deleteComment=require('./deleteComment')

module.exports={getAllComments,getCommentById , createComment,updateComment,deleteComment}