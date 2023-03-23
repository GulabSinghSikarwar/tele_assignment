const createPost= require('./createPost').createPost
const getPostById=require('./getPost').getPostById
const getAllPosts=require('./getPost').getAllPosts
const updatePostById=require('./updatePost')
const deletePostById=require('./deletePost')

module.exports={createPost,getPostById ,updatePostById,deletePostById,getAllPosts}