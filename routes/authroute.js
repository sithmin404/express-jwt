
require('dotenv').config()
const {Router} = require('express')
const userModel = require('../models/usermodel')
const jwt = require('jsonwebtoken')

const router = Router()

// router.get("/signup",(req,res)=>{
//     res.send("signup get")
// })

// router.get("/signin",(req,res)=>{
//     res.send("signin get")
// })

router.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.create({email,password})
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:3600})
        res.cookie('jwt',token,{httpOnly:true,maxAge:3600*1000})
        res.status(200).json({user:user._id})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
})

router.post("/signin",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.login(email,password)
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:3600})
        res.cookie('jwt',token,{httpOnly:true,maxAge:3600*1000})
        res.status(200).json({user:user._id})
    } catch (error) {
        res.status(401).json({error:error.message})
    }
})

router.get("/signout",(req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/')
})

module.exports = router;