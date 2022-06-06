const router = require('express').Router()
const Product = require('../models/Product')
const User = require('../models/User')
const Cart = require('../models/Cart')
const cartcontroller = require('../controller/cartController')

const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')


router.post('/',verifyToken, cartcontroller.createCart)

router.get('/mycart',verifyToken, cartcontroller.myCart)

router.delete('/',verifyToken,cartcontroller.deleteCart)

router.put('/:productId',verifyToken, cartcontroller.decreaseQuantity)

router.delete('/:productId',verifyToken, cartcontroller.removeProductFromCart)

//Admin Cart Routes

router.get('/',verifyTokenAndAdmin,cartcontroller.cartListAdmin)

router.get('/:userid',verifyTokenAndAdmin,cartcontroller.searchCartById)

module.exports = router
