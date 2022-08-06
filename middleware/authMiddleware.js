require('dotenv').config()

const jwt = require('jsonwebtoken')
const userModel = require('../models/usermodel')
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

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token,process.env.JWT_SECRET,async(err,decodetoken)=>{
            if (err) {
                res.locals.user = null
                next()
            }
            else {
                const user = await userModel.findById(decodetoken.id)
                res.locals.user = user.email;
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth,checkUser}