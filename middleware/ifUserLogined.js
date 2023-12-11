// If user is logined then dont show the login and signup page
const jwt = require('jsonwebtoken')

const ifUserLogined = async(req,res,next)=>{
    try {
        const userToken = req.cookies.userToken
        jwt.verify(userToken,'1234',(error,decoded)=>{
            if(error){
                next()
            }else{
                console.log(decoded.name)
                res.redirect('/')
            }
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = ifUserLogined