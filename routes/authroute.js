
const {Router} = require('express')
const userModel = require('../models/usermodel')
const router = Router()

router.get("/signup",(req,res)=>{
    res.send("signup get")
})

router.get("/signin",(req,res)=>{
    res.send("signin get")
})

router.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.create({email,password})
        res.status(201).json(user)
    } catch (error) {
        res.status(401).json({error:error.message})
    }
})

router.post("/signin",(req,res)=>{
    res.send("signin post")
})

module.exports = router;