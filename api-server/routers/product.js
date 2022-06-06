const router = require('express').Router()
const Product = require('../models/Product')
const productcontroller = require('../controller/productController')
const {verifyToken,verifyTokenAndAdmin} = require('../utils/verifyToken')


router.get('/',verifyToken,productcontroller.allProduct)


router.post('/',verifyTokenAndAdmin,productcontroller.addProduct)

router.put('/:id',verifyTokenAndAdmin,productcontroller.updateProduct)

router.delete('/:id',verifyTokenAndAdmin,productcontroller.deleteProduct)

router.get('/:id',verifyToken,productcontroller.searchProductById)

module.exports = router
