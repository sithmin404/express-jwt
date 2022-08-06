
const {Router} = require('express')
const {requireAuth} = require('../middleware/authMiddleware')

const app = Router()

app.get("/", (req, res) => {
    res.render('home',{user:res.locals.user})
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

app.get("/market",requireAuth ,(req, res) => {
    res.render('market')
})

module.exports = app;