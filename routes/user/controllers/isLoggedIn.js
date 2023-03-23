const jwt = require('jsonwebtoken')


const isLoggedIn = async (req, resp, next) => {
    try {

        const cookies = req.cookies;

        const token = cookies.jwt;

         const decoded_token=await verifyToken(token)

         if(decoded_token)
         {
            next()
         }
         else{
            resp.status(200).json({
                message:"You  are not logged In !"
            })
         }

    } catch (error) {

        resp.status(400).json({
            success:"0",
            message:error.message
        })
    }




}
const verifyToken = (token) => {
    try {
        var decoded = jwt.verify(token, 'secret_key');

        return decoded


    } catch (err) {
        // err

        console.log(err.message);
    }
}
module.exports={isLoggedIn}