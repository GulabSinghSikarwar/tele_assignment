const bcrypt = require('bcrypt');
const User = require('../../../models/User')

const createUser = async (req, resp) => {

    const body = req.body;
    try {


        const raw_password=body.password;

        const hashed_password = await encrypted_password(body.password);
        
        body['password']=hashed_password
        
        const user = await User.create(body);
        resp.status(200).json({
            status: "success",
            data: user,
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: 0,
            message: "Something went wrong!",
            detailed_message:error.message
        });
    }

}
const encrypted_password= async(raw_password)=>{

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(raw_password, salt)

    return hashPassword
}

module.exports=createUser