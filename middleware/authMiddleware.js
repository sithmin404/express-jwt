require('dotenv').config()

const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token,process.env.JWT_SECRET,(err,decodetoken)=>{
            if (err) {
                res.redirect('/signin')
            }
            else {
                next()
            }
        })
    }
    else {
        res.redirect('/signin')
    }
}

module.exports = {requireAuth}