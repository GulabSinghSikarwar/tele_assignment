const User = require('../../../models/User')


const getUserById = async (req, resp, next) => {

    try {

        const id = req.params.id;
        const user = await User.findByPk(id);
        resp.status(200).json({
            status :"success !!" ,
            data:user
        })


    } catch (error) {
        resp.status(400).json({
            status :" some error Occured !!" ,
            message :error.message
        })
    }
}
module.exports=getUserById