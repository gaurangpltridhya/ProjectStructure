const User = require('../models/User')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

module.exports.userRegister = async(req,res) => {
    try{
    const newUser =  new User({
        email : req.body.email,
        password : cryptojs.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET)
    })
    const savedUser = await newUser.save()
    res.status(200).send({status:"pass",message: "User Registration Succesufull" })
    }catch(err){
        res.send({status:"fail",message: "User Registration Failed",Error:err.message})
    }
}

module.exports.userLogin =async(req,res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            res.status(401).send({message: "User Not Found"})
        }else{
        const hashedpassword = cryptojs.AES.decrypt(user.password,process.env.PASSWORD_SECRET)
        const orignalpassword = hashedpassword.toString(cryptojs.enc.Utf8)
        if(orignalpassword != req.body.password ){
        res.status(401).send({message: "Wrong Credential"})
        }else{

        const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
        const {password,...other} = user._doc
        res.status(200).send({message: "User Authentication Succesful",user:other,accessToken:accessToken})
        }}
    }catch(err){
        res.send({status:"fail",message: "User Registration Failed",Error:err.message})
    }
}