require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authroute')
const cookieParser = require('cookie-parser')
const app = express()

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

app.use(express.json())
app.use(cookieParser())

app.use('/auth',authRoute) 

const dbURL = process.env.DBURL;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result=>{app.listen(3000,()=>{
        console.log('server startup');
    })})
    .catch(error=>{
        console.log({error:error.message});
    })
