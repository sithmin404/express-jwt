require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authroute')
const pageRoute = require('./routes/pageroute')
const cookieParser = require('cookie-parser')
const {checkUser} = require('./middleware/authMiddleware')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.set('view engine','ejs')

app.use(checkUser,pageRoute)

app.use('/auth',authRoute) 

const dbURL = process.env.DBURL;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result=>{app.listen(3000,()=>{
        console.log('server startup');
    })})
    .catch(error=>{
        console.log({error:error.message});
    })
