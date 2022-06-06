const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {type: String,required: true,},
    image : {
        type: String,
        default :"https://media.istockphoto.com/vectors/male-hand-holding-megaphone-with-new-product-speech-bubble-banner-vector-id1154954910?k=20&m=1154954910&s=612x612&w=0&h=-UnuowcR6R6t7CDpl1516FAsSCZGBYKXK6Fg6CM2nTI=",
    },
    Description:{type:Object,required:true},
},{timestamps: true })

const Category =  mongoose.model('Category',categorySchema)
module.exports = Category;