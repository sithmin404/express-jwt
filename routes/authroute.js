
const {Router} = require('express')

const router = Router()

router.get("/signup",(req,res)=>{
    res.send("signup get")
})

router.get("/signin",(req,res)=>{
    res.send("signin get")
})

router.post("/signup",(req,res)=>{
    res.send("signup post")
})

router.post("/signin",(req,res)=>{
    res.send("signin post")
})

module.exports = router;