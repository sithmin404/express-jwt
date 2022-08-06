require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authroute')
const cookieParser = require('cookie-parser')
const {requireAuth} = require('./middleware/authMiddleware')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.set('view engine','ejs')

app.get("/", (req, res) => {
    res.render('home')
})

app.get("/signup", (req, res) => {
    res.render('signup')
})

app.get("/signin", (req, res) => {
    res.render('signin')
})

app.get("/chart",requireAuth ,(req, res) => {
    res.render('chart')
})

app.use('/auth',authRoute) 

const dbURL = process.env.DBURL;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result=>{app.listen(3000,()=>{
        console.log('server startup');
    })})
    .catch(error=>{
        console.log({error:error.message});
    })
