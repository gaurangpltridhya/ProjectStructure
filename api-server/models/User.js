const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type: 'string',
        unique: true,
        required: true,
        lowercase: true,
    },
    password : {
        type: 'string',
        required: true,
    },
    isAdmin :{
        type: 'boolean',
        default: false
    }, 
},{timestamps: true })

const User =  mongoose.model('User',userSchema)
module.exports = User;


 