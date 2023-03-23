const User = require('../../../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginUser = async (req, resp) => {
    const body = req.body;
    const email = body.email;
    try {


        const userFound = await User.findOne({
            where: {
                email
            }
        })

        // console.log("user Found:" ,userFound);
        if (userFound) {

            const textPassword = body.password;
            const hashed_password = userFound.password;

            var isValid = await validPassword(textPassword, hashed_password)
            console.log("user -- found  check valid ");

            if (isValid) {
                //  creating the token 
                const jwtToken=await getJwtToken(userFound.id)
                
                //  setting token 
                resp.cookie('jwt',jwtToken)

                resp.status(200).json({
                    status: "success",
                    data: userFound,
                })

            } else {
                resp.status(200).json({
                    status: "0",

                    message: "Wrong Password !",

                })
            }

        }
        else {
            resp.status(200).json({
                status: "0",

                message: "Wrong Email!",

            })
        }


    } catch (error) {
        resp.status(400).json({
            status: "0",

            message: error.message,


        })

    }


}

const validPassword = async (raw_password, hashed_password) => {

    const valid = await bcrypt.compare(raw_password, hashed_password);


    return valid

}


const getJwtToken = async (userId) => {

    const jwtToken = await jwt.sign(
        {
            data: userId
        }
        , 'secret_key'
        ,
        { expiresIn: 60 * 60 });
    return jwtToken;

}
module.exports = loginUser