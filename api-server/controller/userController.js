const cryptojs = require('crypto-js')
const User = require('../models/User')

module.exports.allUser = async(req,res)=>{
    try{
        const users = await User.find({}).sort({ "createdAt": -1 })
        if(users.length > 0){
            res.status(200).send({message:"User List",Users:users})
        }else{
            res.status(404).send({ status: "Not Found",Error:"No User Found.!"})
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

module.exports.updateUser = async(req,res)=>{
    if(req.body.password){
        req.body.password = cryptojs.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET)
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.user.id,{
            $set : req.body
        },{new:true})
        res.status(200).send({message:"User Updated",user:updateUser})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

module.exports.deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send({message:"User Deleted"})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

module.exports.searchUserById = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id,{_id:1,username:1,email:1})
        if(user){
        res.status(200).send({message:"Search Result",User:user})
        }else{
            res.status(404).send({ Error:"User Not Found",message:"user with id " + req.params.id+"doesnt exist"})
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}
