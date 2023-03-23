const Post = require('../../../models/Post')

const updatePostById = async (req, resp, next) => {
    try {

        const id = req.params.id;
        const body = req.body

        const updated_post = await Post.update({ ...body }, {
            where: {
                id
            }
        })


        resp.status(400).json({
            status: "success !!",
            body: updated_post[0]
        })
    } catch (error) {

        resp.status(400).json({
            status: "Some error Occured !! ",
            message: error.message
        })
    }
}
module.exports=updatePostById
