

const router = require("express").Router();
const createUser=require('./user/controllers/index').createUser
const loginUser=require('./user/controllers/index').loginUser
const getUserById =require('./user/controllers/index').getUserById
const PostAction=require('./post/controllers/index')
const commentAction=require('./comment/controllers/index')
const likePost=require('./like/likePost')
const dislikePost=require('./dislike/disLike')
const isLoggedIn=require('./user/controllers/isLoggedIn').isLoggedIn
const alreadyLiked =require('./like/alreadyLiked')
const alreadyDisLiked =require('./dislike/alreadyDislike')


router.post('/api/signup',createUser)
router.post('/api/login',loginUser)
router.get('/api/users/:id',isLoggedIn,getUserById)
// create post route 
router.get('/api/posts',isLoggedIn, PostAction.getAllPosts)
router.post('/api/posts',isLoggedIn, PostAction.createPost)
router.get('/api/posts/:id',isLoggedIn,PostAction.getPostById)

// update the post with  given id 
router.put('/api/posts/:id', isLoggedIn,PostAction.updatePostById)

// delete the post with given id 
router.delete('/api/posts/:id',isLoggedIn,PostAction.deletePostById)

// gett all comments 
router.get('/api/comments', isLoggedIn,commentAction.getAllComments)
// get comment  with specific id 
router.get('/api/comments/:id', isLoggedIn, commentAction.getCommentById)

//  create comment 
router.post('/api/comments', isLoggedIn ,commentAction.createComment)

// update comment 

router.put('/api/comments/:id', isLoggedIn ,commentAction.updateComment)
//  delete comment 
router.delete('/api/comments/:id',isLoggedIn, commentAction.deleteComment)

// 
router.post('/api/like',isLoggedIn,alreadyLiked, likePost)
router.post('/api/unlike', isLoggedIn , alreadyDisLiked,dislikePost)




module.exports=router