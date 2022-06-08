const router = require('express').Router()
const categorycontroller = require('../controller/categoryController')
const {verifyTokenAndAdmin} = require('../utils/verifyToken')


router.get('/',verifyTokenAndAdmin,categorycontroller.allCategory)

router.post('/',verifyTokenAndAdmin,categorycontroller.addCategory)

router.put('/:id',verifyTokenAndAdmin,categorycontroller.updateCategory)

router.delete('/:id',verifyTokenAndAdmin,categorycontroller.deleteCategory)

router.get('/:id',verifyTokenAndAdmin,categorycontroller.searchCategoryById)

module.exports = router