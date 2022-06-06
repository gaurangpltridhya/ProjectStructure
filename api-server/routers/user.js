const router = require('express').Router()
const usercontroller = require('../controller/userController')
const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('../utils/verifyToken')

router.get('/',verifyToken,usercontroller.allUser)
router.put('/',verifyToken,usercontroller.updateUser)

router.delete('/:id',verifyToken,usercontroller.deleteUser)

router.get('/:id',verifyToken,usercontroller.searchUserById)
module.exports = router
