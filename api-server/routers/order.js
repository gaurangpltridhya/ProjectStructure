const router = require('express').Router()
const ordercontroller = require('../controller/orderController')
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')

router.get('/',verifyTokenAndAdmin,ordercontroller.allOrders)

router.get('/MyOrder',verifyToken, ordercontroller.myOrders)

router.post('/',verifyToken,ordercontroller.createOrder)

router.put('/:id',verifyTokenAndAdmin, ordercontroller.updateOrder)

router.delete('/:id',verifyTokenAndAdmin, ordercontroller.deleteOrder)

router.get('/:userId',verifyTokenAndAdmin,ordercontroller.searchUserOrder)



module.exports = router
