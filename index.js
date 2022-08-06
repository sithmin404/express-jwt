require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/authroute')

const app = express()

app.get("/", (req, res) => {
    res.json({ msg: 'hello world' })
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
