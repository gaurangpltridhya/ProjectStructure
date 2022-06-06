const Category = require('../models/Category')

module.exports.allCategory = async(req,res)=>{
    try{

        const Categorys = await Category.find().sort({ "createdAt": -1 })

        if(Categorys.length>0){
        res.status(200).send({message:"Category List",Categorys:Categorys})
        }else{
            res.status(404).send({ Error:"Category Not Found",message:"Category doesnt exist"})
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

module.exports.addCategory = async(req,res)=>{
    const  newCategory = new  Category(req.body)
    try{
        const savedCategory = await newCategory.save()
        res.status(200).send({message:"Category Added",CategoryDetail:savedCategory})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

module.exports.updateCategory = async(req,res)=>{
    try{
        const updateCategory = await Category.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true})
        res.status(200).send({message:"updatedCategory ",updatedCategory:updateCategory})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

module.exports.deleteCategory = async(req,res)=>{
    try{
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).send({message:"Category Deleted"})
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}

module.exports.searchCategoryById = async(req,res)=>{
    try{
        const searchedCategory = await Category.findById(req.params.id)
        if(searchedCategory){
        res.status(200).send({message:"Search Result",SearchedCategory:searchedCategory})
        }else{
            res.status(404).send({ Error:"Category Not Found",message:"Produc with id " + req.params.id+"doesnt exist"})
        }
    }catch(err){
        res.status(401).send({Error:err.message})
    }
}