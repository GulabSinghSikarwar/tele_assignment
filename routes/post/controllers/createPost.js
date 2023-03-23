const Post =require('../../../models/Post')
const jwt =require('jsonwebtoken')
const createPost = async(req,resp,next)=>{

    try {
        
        const cookies =req.cookies;
        const token=cookies.jwt;

        const id=await getUserId(token);
        const body=req.body;

        const createdPost=await createPostHelper(id , body);

        
        resp.status(200).json({
            status:"success  !! ",
            data:createdPost
        })
        
    } catch (error) {
        resp.status(400).json({
            status:"Some Error Occured   !! ",
            data:error.message
        })
    }
}
const getUserId= async(token)=>{

    const decoded =await jwt.verify(token,'secret_key')
    
    const id =await  decoded.data;

    return id

}
const createPostHelper=async (userId, body)=>{
    
    const data={
        title:body.title,
        content:body.content,
        category:body.category,
        userId
    }

    const createdPost=await Post.create({...data});
    return createdPost;



}
module.exports={createPost}