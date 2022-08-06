
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})

userSchema.pre('save',async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.static.login = async function(email,password){
    const user = await this.findOne({email})
    if (user) {
        const auth = await bcrypt.compare(password,user.password)
        if (auth) return user
        throw Error("Incorrect Password")
    }
    throw Error("User not found")
}

const userModel = mongoose.model('user',userSchema)

module.exports = userModel;